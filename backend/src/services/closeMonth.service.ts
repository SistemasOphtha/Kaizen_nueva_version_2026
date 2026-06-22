import { Op } from 'sequelize';
import User from '../models/User';
import Portfolio from '../models/Portfolio';
import ThirdsPortfolio from '../models/ThirdsPortfolio';
import Third from '../models/Third';
import Visit from '../models/Visit';
import Justification from '../models/Justification';
import moment from 'moment-timezone';
import logger from '../utils/logger';

/**
 * Ejecuta la lógica del cierre de mes
 * @param targetDateInput - Opcional. Fecha objetivo para el cierre. Por defecto es el mes anterior.
 */
export const closeMonthLogic = async (targetDateInput?: moment.Moment) => {
  let targetDate = targetDateInput ? targetDateInput.clone() : moment().subtract(1, 'month');
  const startOfMonth = targetDate.clone().startOf('month').toDate();
  const endOfMonth = targetDate.clone().endOf('month').toDate();
  const year = targetDate.year();
  const monthName = targetDate.locale('es').format('MMMM');

  logger.info(`[Scheduler] Iniciando cierre de mes para: ${monthName} ${year} (${startOfMonth.toISOString()} - ${endOfMonth.toISOString()})`);

  // 1. Obtener todos los representantes activos
  const users = await User.findAll({
    where: { status: 'active' }
  });

  let justificationsCreated = 0;
  const details = [];

  for (const user of users) {
    // 2. Buscar portafolio activo del representante
    const portfolio = await Portfolio.findOne({
      where: { userId: user.id }
    });

    if (!portfolio) continue;

    // 3. Obtener todos los terceros aprobados en su portafolio
    const approvedThirdPortfolios = await ThirdsPortfolio.findAll({
      where: {
        portfolioId: portfolio.id,
        approved: true
      },
      include: [{
        model: Third,
        required: true
      }]
    });

    for (const tp of approvedThirdPortfolios) {
      const third = (tp as any).third;
      if (!third || third.status !== 'active') continue;

      const expectedImpact = third.impact || 0;
      if (expectedImpact <= 0) continue;

      // 4. Contar visitas realizadas por este representante a este tercero en ese mes
      const visitsCount = await Visit.count({
        where: {
          userId: user.id,
          thirdId: third.id,
          date: {
            [Op.between]: [startOfMonth, endOfMonth]
          },
          status: 'active'
        }
      });

      // 5. Si las visitas son menores al impacto, generar justificaciones
      const missingVisits = expectedImpact - visitsCount;
      if (missingVisits > 0) {
        // Idempotencia: Verificar cuántas justificaciones ya existen para este mes
        const existingCount = await Justification.count({
          where: {
            userId: user.id,
            thirdId: third.id,
            dateToJustify: {
              [Op.between]: [startOfMonth, endOfMonth]
            }
          }
        });

        const neededJustifications = missingVisits - existingCount;

        if (neededJustifications > 0) {
          for (let i = 0; i < neededJustifications; i++) {
            await Justification.create({
              thirdId: third.id,
              userId: user.id,
              date: new Date(),
              dateToJustify: endOfMonth,
              description: 'Pendiente de justificación',
              status: 'active'
            });
            justificationsCreated++;
          }
          details.push({
            user: user.name || user.email,
            third: third.name,
            expected: expectedImpact,
            completed: visitsCount,
            missing: missingVisits,
            generated: neededJustifications
          });
        }
      }
    }
  }

  logger.info(`[Scheduler] Cierre de mes completado para ${monthName} ${year}. Justificaciones creadas: ${justificationsCreated}`);
  return {
    monthName,
    year,
    justificationsCreated,
    details
  };
};

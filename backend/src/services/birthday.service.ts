import Third from '../models/Third';
import ThirdsPortfolio from '../models/ThirdsPortfolio';
import Portfolio from '../models/Portfolio';
import User from '../models/User';
import { sendEmail } from '../libs/sendEmail';
import logger from '../utils/logger';
import moment from 'moment-timezone';

/**
 * Procesa los cumpleaños del día:
 * 1. Envía felicitaciones a los médicos que cumplen años hoy.
 * 2. Notifica a los representantes asignados 3 días antes del cumpleaños de un médico.
 */
export const processBirthdays = async () => {
  const today = moment();
  const todayMonth = today.month(); // 0-indexed en moment
  const todayDay = today.date();

  logger.info(`[Birthday] Iniciando procesamiento de cumpleaños. Fecha actual: ${today.format('DD/MM')}`);

  // 1. Congratular a los médicos que cumplen años HOY
  const activeThirds = await Third.findAll({
    where: { status: 'active' }
  });

  for (const third of activeThirds) {
    if (third.birthday) {
      const bday = moment(third.birthday);
      if (bday.month() === todayMonth && bday.date() === todayDay) {
        logger.info(`[Birthday] Hoy es cumpleaños de: ${third.name} (${third.email})`);
        if (third.email) {
          try {
            sendEmail(
              third.email,
              '¡Feliz Cumpleaños de parte de Ophtha!',
              `<h3>Estimado(a) ${third.name},</h3>
               <p>De parte de todo el equipo de <strong>Ophtha Kaizen</strong>, le deseamos un muy feliz cumpleaños. Que este día esté lleno de salud, alegría y éxitos.</p>
               <br/>
               <p>Atentamente,<br/>Equipo Kaizen Ophtha</p>`
            );
          } catch (e) {
            logger.error(`[Birthday] Error al enviar felicitación a ${third.email}`, e);
          }
        }
      }
    }
  }

  // 2. Notificar a asesores 3 días antes de cumpleaños
  const targetDay = today.clone().add(3, 'days');
  const targetMonth = targetDay.month();
  const targetDayOfMonth = targetDay.date();

  logger.info(`[Birthday] Buscando cumpleaños para notificar a asesores para la fecha: ${targetDay.format('DD/MM')}`);

  for (const third of activeThirds) {
    if (third.birthday) {
      const bday = moment(third.birthday);
      if (bday.month() === targetMonth && bday.date() === targetDayOfMonth) {
        logger.info(`[Birthday] Cumpleaños de ${third.name} es en 3 días (${bday.format('DD/MM')}). Buscando asesores asignados...`);

        // Buscar portafolios que tengan a este tercero aprobado
        const portfoliosWithThird = await ThirdsPortfolio.findAll({
          where: {
            thirdId: third.id,
            approved: true
          },
          include: [{
            model: Portfolio,
            required: true,
            include: [{
              model: User,
              required: true,
              where: { status: 'active' }
            }]
          }]
        });

        for (const pt of portfoliosWithThird) {
          const user = (pt as any).portfolio?.user;
          if (user && user.email) {
            logger.info(`[Birthday] Notificando a asesor ${user.name || user.email} del cumpleaños de ${third.name}`);
            try {
              sendEmail(
                user.email,
                'Recordatorio de Cumpleaños de Médico',
                `<h3>Hola ${user.name || 'Asesor'},</h3>
                 <p>Te recordamos que tu médico asignado <strong>${third.name}</strong> cumple años en 3 días (el <strong>${bday.format('DD/MM')}</strong>).</p>
                 <p>Aprovecha esta fecha especial para saludarle y fortalecer la relación.</p>
                 <br/>
                 <p>Atentamente,<br/>Plataforma Kaizen Ophtha</p>`
              );
            } catch (e) {
              logger.error(`[Birthday] Error al enviar correo de aviso de cumpleaños a asesor ${user.email}`, e);
            }
          }
        }
      }
    }
  }
  
  logger.info(`[Birthday] Procesamiento de cumpleaños finalizado.`);
};

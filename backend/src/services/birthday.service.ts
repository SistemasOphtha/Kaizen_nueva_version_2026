import Third from '../models/Third';
import ThirdsPortfolio from '../models/ThirdsPortfolio';
import Portfolio from '../models/Portfolio';
import User from '../models/User';
import { sendEmail } from '../libs/sendEmail';
import logger from '../utils/logger';
import moment from 'moment-timezone';
import Config from '../models/Config';

/**
 * Procesa los cumpleaños del día:
 * 1. Envía felicitaciones a los médicos que cumplen años hoy.
 * 2. Los viernes: Notifica a los representantes asignados sobre los médicos que cumplen años la próxima semana.
 */
export const processBirthdays = async () => {
  const today = moment();
  const todayMonth = today.month(); // 0-indexed en moment
  const todayDay = today.date();

  logger.info(`[Birthday] Iniciando procesamiento de cumpleaños. Fecha actual: ${today.format('DD/MM')}`);

  const activeThirds = await Third.findAll({
    where: { status: 'active' }
  });

  let templateConfig = await Config.findOne({ where: { name: 'birthday_email_template' } });
  let subject = '¡Feliz Cumpleaños de parte de Ophtha!';
  let htmlTemplate = `<h3>Estimado(a) {{NAME}},</h3>
               <p>De parte de todo el equipo de <strong>Ophtha Kaizen</strong>, le deseamos un muy feliz cumpleaños. Que este día esté lleno de salud, alegría y éxitos.</p>
               <br/>
               <p>Atentamente,<br/>Equipo Kaizen Ophtha</p>`;
  
  if (templateConfig && templateConfig.value) {
    try {
      const parsed = JSON.parse(templateConfig.value);
      subject = parsed.subject || subject;
      htmlTemplate = parsed.html || htmlTemplate;
    } catch (e) {
      logger.error('[Birthday] Error parsing birthday email template config', e);
    }
  }

  let smtpConfig = undefined;
  const smtpConfigRaw = await Config.findOne({ where: { name: 'birthday_smtp_config' } });
  if (smtpConfigRaw && smtpConfigRaw.value) {
    try {
      smtpConfig = JSON.parse(smtpConfigRaw.value);
    } catch (e) {
      logger.error('[Birthday] Error parsing smtp config', e);
    }
  }

  // 1. Congratular a los médicos que cumplen años HOY
  for (const third of activeThirds) {
    if (third.birthday) {
      const bday = moment(third.birthday);
      if (bday.month() === todayMonth && bday.date() === todayDay) {
        logger.info(`[Birthday] Hoy es cumpleaños de: ${third.name} (${third.email})`);
        if (third.email) {
          try {
            const finalHtml = htmlTemplate.replace(/\{\{NAME\}\}/g, third.name);
            sendEmail(
              third.email,
              subject,
              finalHtml,
              smtpConfig
            );
          } catch (e) {
            logger.error(`[Birthday] Error al enviar felicitación a ${third.email}`, e);
          }
        }
      }
    }
  }

  // 2. Notificar a asesores los viernes
  if (today.day() === 5) { // 5 = Friday
    logger.info(`[Birthday] Hoy es viernes. Buscando cumpleaños para notificar a asesores (próxima semana).`);
    
    const nextWeekStart = today.clone().add(1, 'weeks').startOf('isoWeek'); // Lunes
    const nextWeekEnd = today.clone().add(1, 'weeks').endOf('isoWeek'); // Domingo
    
    const nextWeekDays: { month: number, date: number, formatted: string }[] = [];
    let curr = nextWeekStart.clone();
    while (curr.isSameOrBefore(nextWeekEnd)) {
        nextWeekDays.push({ month: curr.month(), date: curr.date(), formatted: curr.format('DD/MM/YYYY') });
        curr.add(1, 'days');
    }

    const upcomingBirthdays = [];
    for (const third of activeThirds) {
       if (third.birthday) {
          const bday = moment(third.birthday);
          const match = nextWeekDays.find(d => d.month === bday.month() && d.date === bday.date());
          if (match) {
             upcomingBirthdays.push({ third, formattedDate: match.formatted });
          }
       }
    }

    if (upcomingBirthdays.length > 0) {
       const repEmailMap = new Map<string, { user: any, doctors: string[] }>();

       for (const { third, formattedDate } of upcomingBirthdays) {
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
              if (!repEmailMap.has(user.email)) {
                repEmailMap.set(user.email, { user, doctors: [] });
              }
              repEmailMap.get(user.email)!.doctors.push(`- <strong>${third.name}</strong> (Cumple el ${formattedDate})`);
            }
          }
       }

       for (const [repEmail, data] of repEmailMap.entries()) {
          logger.info(`[Birthday] Notificando a asesor ${data.user.name || repEmail} de los cumpleaños de la próxima semana`);
          try {
            const docList = data.doctors.join('<br/>');
            sendEmail(
              repEmail,
              'Recordatorio de Cumpleaños de tus Médicos la Próxima Semana',
              `<h3>Hola ${data.user.name || 'Asesor'},</h3>
               <p>Te recordamos que los siguientes médicos de tu panel cumplen años la próxima semana:</p>
               <p>${docList}</p>
               <p>Aprovecha esta oportunidad para saludarles y fortalecer la relación.</p>
               <br/>
               <p>Atentamente,<br/>Plataforma Kaizen Ophtha</p>`,
               smtpConfig
            );
          } catch (e) {
            logger.error(`[Birthday] Error al enviar correo de aviso a asesor ${repEmail}`, e);
          }
       }
    }
  } else {
    logger.info(`[Birthday] Hoy no es viernes, se omite el aviso a los representantes.`);
  }
  
  logger.info(`[Birthday] Procesamiento de cumpleaños finalizado.`);
};

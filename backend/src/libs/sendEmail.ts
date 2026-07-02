import nodemailer from 'nodemailer';

export const sendEmail = (email: string, subject: string, message: string, customSmtp?: any): void => {
  const host = customSmtp?.host || process.env.EMAIL_HOST;
  const port = parseInt(customSmtp?.port || process.env.EMAIL_PORT || '465', 10);
  const user = customSmtp?.user || process.env.EMAIL_SEND;
  const pass = customSmtp?.pass || process.env.EMAIL_PASS;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: true,
    auth: {
      user,
      pass,
    },
  });

  const mailOptions = {
    from: user,
    to: email, // Destinatario
    subject: `[${subject}]`,
    html: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
    } else {
      console.log('Correo enviado:', info.response);
    }
  });
};

export const sendEmailAttachment = async (
  email: string,
  subject: string,
  message: string,
  file: any,
  filename: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT || '465', 10),
        secure: true,
        auth: {
          user: process.env.EMAIL_SEND,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      const mailOptions = {
        from: process.env.EMAIL_SEND,
        to: email,
        subject: `${subject}`,
        html: message,
        attachments: [
          {
            filename: filename,
            path: file.path,
            contentType: 'application/pdf',
          },
        ],
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error al enviar el correo:', error);
          resolve({
            status: 'failed',
            message: 'Error sending mail',
            error: error
          });
        } else {
          console.log('Correo enviado:', info.response);
          resolve({
            status: 'success',
            message: 'Mail sent successfully',
            error: null
          });
        }
      });
    } catch (error) {
      reject({
        status: 'failed',
        message: "Error sending mail",
        error: error
      });
    }
  });
};

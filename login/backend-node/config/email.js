const nodemailer = require('nodemailer');
require('dotenv').config();

const smtpUser = process.env.SMTP_USER?.trim();
const smtpPass = (process.env.SMTP_PASS || '').replace(/\s/g, '');
const smtpHost = process.env.SMTP_HOST?.trim();
const port = Number(process.env.SMTP_PORT) || 587;

const isDevCodeLoggingEnabled = () =>
  process.env.NODE_ENV === 'development' &&
  process.env.DEV_LOG_VERIFICATION_CODE === 'true';

const logVerificationCodeForDev = (email, code) => {
  if (!isDevCodeLoggingEnabled()) return false;

  console.log('\n========================================');
  console.log(`[DEV] Código de verificación para ${email}: ${code}`);
  console.log('(Activa 2FA en Google o usa Brevo para enviar correos reales)');
  console.log('========================================\n');
  return true;
};

const isPlaceholderConfig = () => {
  const user = (smtpUser || '').toLowerCase();
  const pass = (smtpPass || '').toLowerCase();
  return (
    !smtpUser ||
    !smtpPass ||
    user.includes('tu_usuario') ||
    user.includes('tu_correo') ||
    user.includes('tu_gmail') ||
    pass.includes('tu_contraseña') ||
    pass.includes('tu_contraseña_de_aplicacion') ||
    pass.includes('coloca_aqui') ||
    pass.includes('mailtrap') ||
    smtpHost === 'smtp.mailtrap.io'
  );
};

const createTransporter = () => {
  if (smtpHost === 'smtp.gmail.com') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: { user: smtpUser, pass: smtpPass }
    });
  }

  return nodemailer.createTransport({
    host: smtpHost,
    port,
    secure: port === 465,
    auth: { user: smtpUser, pass: smtpPass }
  });
};

const transporter = createTransporter();

const verifySmtpConnection = async () => {
  if (isPlaceholderConfig()) {
    if (isDevCodeLoggingEnabled()) {
      console.warn('⚠️  SMTP sin contraseña — los códigos se mostrarán en esta terminal (modo DEV).');
      return false;
    }
    console.warn(
      '⚠️  SMTP no configurado: activa verificación en 2 pasos en Google o usa Brevo (ver README).'
    );
    return false;
  }

  try {
    await transporter.verify();
    console.log(`✓ SMTP listo (${smtpHost}) — los correos se enviarán a bandejas reales`);
    return true;
  } catch (error) {
    console.error('✗ Error al conectar con SMTP:', error.message);
    if (smtpHost === 'smtp.gmail.com') {
      console.error(
        '  Gmail: usa contraseña de aplicación (no tu contraseña normal) y SMTP_FROM = SMTP_USER'
      );
    }
    return false;
  }
};

const sendVerificationEmail = async (email, code, userName) => {
  const mailOptions = {
    from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM}>`,
    to: email,
    subject: 'Tu Código de Verificación - Tienda de Emprendedores',
    html: `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Código de Verificación</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
            color: white;
            padding: 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .content {
            padding: 30px;
          }
          .code-box {
            background-color: #f0f9ff;
            border: 2px solid #0ea5e9;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            margin: 20px 0;
          }
          .code {
            font-size: 36px;
            font-weight: bold;
            color: #0284c7;
            letter-spacing: 8px;
            margin: 0;
          }
          .footer {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
          }
          .warning {
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🛒 Tienda de Emprendedores</h1>
          </div>
          
          <div class="content">
            <h2>Hola, ${userName}!</h2>
            
            <p>Gracias por registrarte en nuestra plataforma. Para completar tu registro y proteger tu cuenta, necesitamos que verifiques tu correo electrónico.</p>
            
            <div class="code-box">
              <p class="code">${code}</p>
            </div>
            
            <p><strong>Instrucciones:</strong></p>
            <ol>
              <li>Copia el código de 6 dígitos que aparece arriba</li>
              <li>Regresa a la página de verificación</li>
              <li>Ingresa el código en el campo correspondiente</li>
              <li>El código expirará en 15 minutos</li>
            </ol>
            
            <div class="warning">
              <p><strong>⚠️ Importante:</strong></p>
              <ul>
                <li>Este código es personal y no debe compartirse</li>
                <li>Si no solicitaste este código, ignora este correo</li>
                <li>Nunca te pediremos tu contraseña por correo</li>
              </ul>
            </div>
            
            <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
            
            <p>¡Bienvenido a nuestra comunidad de emprendedores!</p>
          </div>
          
          <div class="footer">
            <p>© 2024 Tienda de Emprendedores. Todos los derechos reservados.</p>
            <p>Este es un correo automático, por favor no respondas.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  if (isPlaceholderConfig()) {
    return logVerificationCodeForDev(email, code);
  }

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Correo enviado a ${email} (id: ${info.messageId})`);
    return true;
  } catch (error) {
    console.error('Error al enviar email:', error.message);
    return logVerificationCodeForDev(email, code);
  }
};

module.exports = { sendVerificationEmail, verifySmtpConnection, isPlaceholderConfig };

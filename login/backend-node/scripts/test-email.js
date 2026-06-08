/**
 * Prueba rápida de SMTP. Uso:
 *   node scripts/test-email.js tu@gmail.com
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const { sendVerificationEmail, verifySmtpConnection } = require('../config/email');

const to = process.argv[2];

if (!to) {
  console.error('Uso: node scripts/test-email.js tu@gmail.com');
  process.exit(1);
}

(async () => {
  const ok = await verifySmtpConnection();
  if (!ok) {
    process.exit(1);
  }

  const sent = await sendVerificationEmail(to, '123456', 'Prueba');
  if (sent) {
    console.log(`Revisa la bandeja de ${to} (y Spam).`);
  } else {
    process.exit(1);
  }
})();

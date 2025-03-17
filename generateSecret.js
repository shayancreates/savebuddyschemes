const crypto = require('crypto');
const secret = crypto.randomBytes(64).toString('hex');
console.log('Copy this secret to your .env file:');
console.log('JWT_SECRET=' + secret); 
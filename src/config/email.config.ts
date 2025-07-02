import { EmailConfig } from '../types/email.types';

// Add debug logging
// console.log('=== EMAIL CONFIG DEBUG ===');
// console.log('SMTP_HOST env:', process.env.SMTP_HOST);
// console.log('SMTP_USER env:', process.env.SMTP_USER);
// console.log('SMTP_PASS env:', process.env.SMTP_PASS ? 'Set' : 'Not set');
// console.log('PERSONAL_EMAIL env:', process.env.PERSONAL_EMAIL);
// console.log('========================');

export const emailConfig: EmailConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  user: process.env.SMTP_USER || '',
  pass: process.env.SMTP_PASS || ''
};

export const recipientEmail = process.env.PERSONAL_EMAIL || '';

export const validateEmailConfig = (): boolean => {
  // console.log('=== VALIDATION DEBUG ===');
  // console.log('emailConfig.host:', emailConfig.host);
  // console.log('emailConfig.user:', emailConfig.user);
  // console.log('emailConfig.pass:', emailConfig.pass ? 'Set' : 'Empty');
  // console.log('recipientEmail:', recipientEmail);
  // console.log('========================');
  
  const requiredFields = [
    emailConfig.host,
    emailConfig.user,
    emailConfig.pass,
    recipientEmail
  ];
  
  const isValid = requiredFields.every(field => field && field.trim() !== '');
  console.log('Validation result:', isValid);
  
  return isValid;
};
import { Router } from 'express';
import emailController from '../controllers/email.controller';
import { emailRateLimit, validateContactForm } from '../middleware';

const router = Router();

// Health check endpoint
router.get('/health', emailController.healthCheck);

// Send contact email endpoint
router.post('/send-contact', 
  emailRateLimit,
  validateContactForm,
  emailController.sendContactEmail
);

export default router;
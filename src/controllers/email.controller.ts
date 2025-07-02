import { Request, Response } from 'express';
import emailService from '../services/email.service';
import { ContactFormData, ApiResponse } from '../types/email.types';

export class EmailController {
  async sendContactEmail(req: Request, res: Response): Promise<void> {
    try {
      const contactData: ContactFormData = req.body;
      
      // Log the attempt (without sensitive data)
      console.log(`Contact form submission from: ${contactData.email} - Subject: ${contactData.subject}`);
      
      const result = await emailService.sendContactEmail(contactData);
      
      if (result.success) {
        const response: ApiResponse = {
          success: true,
          message: 'Your message has been sent successfully! I\'ll get back to you soon.',
          data: {
            messageId: result.messageId
          }
        };
        
        res.status(200).json(response);
      } else {
        const response: ApiResponse = {
          success: false,
          message: result.message,
          error: 'Email delivery failed'
        };
        
        res.status(500).json(response);
      }
    } catch (error) {
      console.error('Contact form error:', error);
      
      const response: ApiResponse = {
        success: false,
        message: 'Failed to send message. Please try again later.',
        error: 'Internal server error'
      };
      
      res.status(500).json(response);
    }
  }

  async healthCheck(req: Request, res: Response): Promise<void> {
    try {
      const isConnected = await emailService.verifyConnection();
      
      const response: ApiResponse = {
        success: true,
        message: 'Email service is running',
        data: {
          emailServiceConnected: isConnected,
          timestamp: new Date().toISOString()
        }
      };
      
      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        message: 'Email service health check failed',
        error: 'Service unavailable'
      };
      
      res.status(503).json(response);
    }
  }
}

export default new EmailController();
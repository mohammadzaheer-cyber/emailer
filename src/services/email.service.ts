import nodemailer from "nodemailer";
import { ContactFormData, EmailResponse } from "../types/email.types";
import { emailConfig, recipientEmail } from "../config/email.config";

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: emailConfig.host,
      port: emailConfig.port,
      secure: emailConfig.secure,
      auth: {
        user: emailConfig.user,
        pass: emailConfig.pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  private generateEmailTemplate(data: ContactFormData): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Contact Form Submission</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
          .content { background-color: #ffffff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #495057; }
          .value { margin-top: 5px; padding: 10px; background-color: #f8f9fa; border-radius: 4px; }
          .message-content { white-space: pre-wrap; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>📧 New Contact Form Submission</h2>
            <p>You have received a new message from your portfolio website.</p>
          </div>
          
          <div class="content">
            <div class="field">
              <div class="label">👤 Name:</div>
              <div class="value">${data.userName}</div>
            </div>
            
            <div class="field">
              <div class="label">📧 Email:</div>
              <div class="value">${data.email}</div>
            </div>
            
            <div class="field">
              <div class="label">📝 Subject:</div>
              <div class="value">${data.subject}</div>
            </div>
            
            <div class="field">
              <div class="label">💬 Message:</div>
              <div class="value message-content">${data.message}</div>
            </div>
          </div>
          
          <div style="margin-top: 20px; font-size: 12px; color: #6c757d;">
            <p>This email was sent from your portfolio contact form on ${new Date().toLocaleString()}</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  async sendContactEmail(data: ContactFormData): Promise<EmailResponse> {
    try {
      const mailOptions = {
        from: `"Portfolio Contact Form" <${emailConfig.user}>`,
        to: recipientEmail,
        replyTo: data.email,
        subject: `Portfolio Contact: ${data.subject}`,
        html: this.generateEmailTemplate(data),
        text: `
New contact form submission:

Name: ${data.userName}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}

---
Sent from your portfolio contact form on ${new Date().toLocaleString()}
        `,
      };

      const info = await this.transporter.sendMail(mailOptions);

      return {
        success: true,
        message: "Email sent successfully",
        messageId: info.messageId,
      };
    } catch (error) {
      console.error("Email sending error:", error);

      return {
        success: false,
        message: "Failed to send email. Please try again later.",
      };
    }
  }

  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      return true;
    } catch (error) {
      console.error("Email connection verification failed:", error);
      return false;
    }
  }
}

export default new EmailService();

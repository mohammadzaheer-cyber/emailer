# Portfolio Email Backend

A robust Node.js/Express/TypeScript backend service for handling contact form submissions from your portfolio website.

## Features

- ✅ TypeScript support with full type safety
- ✅ Email validation and sanitization
- ✅ Rate limiting to prevent spam
- ✅ CORS configuration for frontend integration
- ✅ Professional HTML email templates
- ✅ Error handling and logging
- ✅ Health check endpoint
- ✅ Security middleware (Helmet)
- ✅ Environment-based configuration

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Gmail account (or other SMTP provider)

## Installation

1. **Clone/Download the project files**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```

4. **Configure your `.env` file:**
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Email Configuration (Gmail example)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password

   # Your personal email where you want to receive messages
   PERSONAL_EMAIL=your-personal-email@gmail.com

   # Frontend URL (for CORS)
   FRONTEND_URL=http://localhost:3000
   ```

## Gmail Setup

To use Gmail as your SMTP provider:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password:**
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password
   - Use this password in `SMTP_PASS` (not your regular Gmail password)

## Available Scripts

```bash
# Development with hot reload
npm run dev

# Build the project
npm run build

# Start production server
npm start

# Clean build directory
npm run clean
```

## API Endpoints

### POST `/api/email/send-contact`
Send a contact form email.

**Request Body:**
```json
{
  "userName": "John Doe",
  "email": "john@example.com",
  "subject": "Website Inquiry",
  "message": "Hello, I'd like to discuss a project..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Your message has been sent successfully! I'll get back to you soon.",
  "data": {
    "messageId": "<message-id>"
  }
}
```

### GET `/api/email/health`
Check the health of the email service.

**Response:**
```json
{
  "success": true,
  "message": "Email service is running",
  "data": {
    "emailServiceConnected": true,
    "timestamp": "2024-01-01T12:00:00.000Z"
  }
}
```

## Frontend Integration

Here's how to integrate with your frontend:

```javascript
// Example frontend code
const sendContactForm = async (formData) => {
  try {
    const response = await fetch('http://localhost:5000/api/email/send-contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: formData.userName,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      })
    });

    const result = await response.json();
    
    if (result.success) {
      alert('Message sent successfully!');
    } else {
      alert('Failed to send message: ' + result.message);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Network error occurred');
  }
};
```

## Rate Limiting

The API includes rate limiting to prevent spam:
- **Window:** 15 minutes (configurable)
- **Max requests:** 5 per IP per window (configurable)

## Validation Rules

The contact form validates:
- **Name:** 2-50 characters, required
- **Email:** Valid email format, required
- **Subject:** 5-100 characters, required
- **Message:** 10-1000 characters, required

## Security Features

- **Helmet:** Sets various HTTP headers for security
- **CORS:** Configurable cross-origin resource sharing
- **Rate Limiting:** Prevents spam and abuse
- **Input Validation:** Sanitizes and validates all inputs
- **Error Handling:** Secure error messages without exposing internals

## Email Template

The service sends professionally formatted HTML emails with:
- Sender information
- Subject line
- Message content
- Timestamp
- Reply-to functionality (recipients can reply directly to the sender)

## Troubleshooting

### Common Issues:

1. **"Email configuration is incomplete"**
   - Check all required environment variables are set
   - Verify SMTP credentials are correct

2. **"Authentication failed"**
   - For Gmail: Use App Password, not regular password
   - Enable 2-Factor Authentication first

3. **CORS errors**
   - Update `FRONTEND_URL` in .env
   - Add your frontend URL to the allowed origins in server.ts

4. **Rate limit exceeded**
   - Wait for the rate limit window to reset
   - Adjust rate limit settings in .env

## Production Deployment

1. **Set environment variables:**
   ```env
   NODE_ENV=production
   PORT=5000
   FRONTEND_URL=https://your-portfolio-domain.com
   ```

2. **Build and start:**
   ```bash
   npm run build
   npm start
   ```

3. **Use a process manager like PM2:**
   ```bash
   npm install -g pm2
   pm2 start dist/server.js --name portfolio-email
   ```

## Support

If you encounter any issues:
1. Check the console logs for error messages
2. Verify your environment variables
3. Test the `/api/email/health` endpoint
4. Ensure your SMTP provider allows the connection

---

**Note:** Keep your `.env` file secure and never commit it to version control. The `.env.example` file is provided as a template.
import Joi from 'joi';

export const contactFormSchema = Joi.object({
  userName: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name must not exceed 50 characters',
      'any.required': 'Name is required'
    }),
    
  email: Joi.string()
    .trim()
    .email()
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
    
  subject: Joi.string()
    .trim()
    .min(5)
    .max(100)
    .required()
    .messages({
      'string.empty': 'Subject is required',
      'string.min': 'Subject must be at least 5 characters long',
      'string.max': 'Subject must not exceed 100 characters',
      'any.required': 'Subject is required'
    }),
    
  message: Joi.string()
    .trim()
    .min(10)
    .max(1000)
    .required()
    .messages({
      'string.empty': 'Message is required',
      'string.min': 'Message must be at least 10 characters long',
      'string.max': 'Message must not exceed 1000 characters',
      'any.required': 'Message is required'
    })
});
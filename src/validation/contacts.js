import Joi from 'joi';

export const contactType = ['work', 'home', 'personal'];

export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required().messages({
      'string.base': 'Username should be a string',
      'string.min': 'Username should have at least {#limit} characters',
      'string.max': 'Username should have at most {#limit} characters',
      'any.required': 'Username is required',
    }),
    phoneNumber: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().min(3).max(20),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid(...contactType).min(3).max(20).default('home').required()
  });

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).messages({
      'string.base': 'Username should be a string',
      'string.min': 'Username should have at least {#limit} characters',
      'string.max': 'Username should have at most {#limit} characters',
      'any.required': 'Username is required',
    }),
    phoneNumber: Joi.string().min(3).max(20),
    email: Joi.string().email().min(3).max(20),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid(...contactType).min(3).max(20).default('home')
  });

import { checkSchema } from 'express-validator'

export const userValidateSchema = checkSchema({
  firstName: {
    exists: { errorMessage: 'First name is required' },
    isString: { errorMessage: 'First name should be string' },
    isLength: {
      options: { min: 2, max: 50 },
      errorMessage: 'First Name must be between 2-50 characters.',
    },
  },
  lastName: {
    exists: { errorMessage: 'Last name is required' },
    isString: { errorMessage: 'Last name should be string' },
    isLength: {
      options: { min: 2, max: 50 },
      errorMessage: 'Last Name must be between 2-50 characters.',
    },
  },
  email: {
    exists: { errorMessage: 'Email is required' },
    isEmail: { errorMessage: 'Invalid email' },
  },
  password: {
    exists: { errorMessage: 'Password is required' },
    isString: { errorMessage: 'Password should be string' },
    isStrongPassword: {
      options: {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      },
      errorMessage:
        'Password must contain 8 characters that is 1 uppercase, 1 lowercase, 1 number and 1 special case character (i.e. !@#_#$-%)',
    },
  },
})

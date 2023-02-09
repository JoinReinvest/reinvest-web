import zod from 'zod';

export const formValidationRules = {
  email: zod.string({ required_error: 'This field is required' }).email('Please provide a valid email'),
  password: zod.string({ required_error: 'This field is required' }),
};

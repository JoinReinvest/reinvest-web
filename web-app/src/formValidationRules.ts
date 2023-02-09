import zod, { z } from 'zod';

export const formValidationRules = {
  email: zod.string({ required_error: 'This field is required' }).email('Please provide a valid email'),
  password: zod.string({ required_error: 'This field is required' }),
  firstName: z.string({ required_error: 'This field is required' }),
  lastName: z.string({ required_error: 'This field is required' }),
  middleName: z.string(),
};

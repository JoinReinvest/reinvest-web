import zod from 'zod';

const passwordSchema = zod
  .string()
  .min(8, 'At least 8 characters are required')
  .regex(/[a-z]/, { message: 'At least one lowercase letter is required' })
  .regex(/[A-Z]/, { message: 'At least one uppercase letter is required' })
  .regex(/\d/, { message: 'At least one number is required' });

export const formValidationRules = {
  email: zod.string({ required_error: 'This field is required' }).email('Please provide a valid email'),
  password: passwordSchema,
  confirm_password: passwordSchema,
  firstName: zod.string({ required_error: 'This field is required' }),
  lastName: zod.string({ required_error: 'This field is required' }),
  middleName: zod.string().optional(),
};

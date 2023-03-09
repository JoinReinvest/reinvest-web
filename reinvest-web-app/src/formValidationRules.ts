import zod from 'zod';

const requiredError = 'This field is required';
const standardRequiredString = zod.string().min(1, requiredError);
const passwordSchema = zod
  .string({ required_error: requiredError })
  .min(8, 'At least 8 characters are required')
  .regex(/[a-z]/, { message: 'At least one lowercase letter is required' })
  .regex(/[A-Z]/, { message: 'At least one uppercase letter is required' })
  .regex(/\d/, { message: 'At least one number is required' });

export const formValidationRules = {
  email: zod.string({ required_error: requiredError }).email('Please provide a valid email'),
  password: passwordSchema,
  confirm_password: passwordSchema,
  firstName: standardRequiredString,
  lastName: standardRequiredString,
  netWorth: standardRequiredString,
  netIncome: standardRequiredString,
  employerName: standardRequiredString,
  occupation: standardRequiredString,
  industry: standardRequiredString,
  middleName: zod.string().optional(),
  referralCode: zod.string().regex(/^\d{6}$/, { message: 'Invalid referral code' }),
  authenticationCode: zod.string({ required_error: requiredError }).regex(/^\d{6}$/, { message: 'Invalid authentication code' }),
  socialSecurityNumber: zod.string().regex(/^(?!666|000|9\\d{2})\\d{3}-(?!00)\\d{2}-(?!0{4})\\d{4}$/, { message: 'Invalid Social Security Number' }),
};

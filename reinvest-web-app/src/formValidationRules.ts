import { BYTES_IN_MEGABYTE } from 'constants/conversions';
import { mapToMimeType, PartialMimeTypeKeys } from 'constants/mime-types';
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
  birthCountry: standardRequiredString,
  citizenshipCountry: standardRequiredString,
  visaType: standardRequiredString,
  middleName: zod.string().optional(),
  referralCode: zod.string().regex(/^\d{6}$/, { message: 'Invalid referral code' }),
  phoneNumber: zod.string().regex(/^\d{10}$/, { message: 'Invalid phone number' }),
  authenticationCode: zod.string({ required_error: requiredError }).regex(/^\d{6}$/, { message: 'Invalid authentication code' }),
};

export const generateFileSchema = (accepts: PartialMimeTypeKeys, sizeLimitInMegaBytes: number) => {
  const sizeLimitInBytes = sizeLimitInMegaBytes * BYTES_IN_MEGABYTE;

  return zod
    .custom<File>()
    .refine(file => !!file, 'The field is required')
    .refine(file => file?.size <= sizeLimitInBytes, `File size must be smaller than ${sizeLimitInMegaBytes}MB`)
    .refine(file => {
      const acceptedTypes = mapToMimeType(accepts);
      const fileType = file?.type;
      const isFileTypeAccepted = acceptedTypes.includes(fileType);

      return isFileTypeAccepted;
    }, 'File type not supported');
};

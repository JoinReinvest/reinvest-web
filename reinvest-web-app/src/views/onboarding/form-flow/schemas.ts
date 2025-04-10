import { PartialMimeTypeKeys } from 'reinvest-app-common/src/constants/mime-types';
import { dateOlderThanEighteenYearsSchema, formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { generateMultiFileSchema } from 'reinvest-app-common/src/form-schemas/files';
import { DomicileType } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

export const ACCEPTED_FILES_MIME_TYPES: PartialMimeTypeKeys = ['pdf', 'png', 'jpeg', 'jpg'];
export const FILE_SIZE_LIMIT_IN_MEGABYTES = 5;
export const MAXIMUM_NUMBER_OF_APPLICANTS = 5;

export const MINIMUM_NUMBER_OF_FILES = 1;
export const MAXIMUM_NUMBER_OF_FILES = 5;

export const APPLICANT_WITHOUT_IDENTIFICATION = z.object({
  firstName: formValidationRules.firstName,
  middleName: formValidationRules.middleName,
  lastName: formValidationRules.lastName,
  socialSecurityNumber: z.string().min(1),
  dateOfBirth: dateOlderThanEighteenYearsSchema,
  domicile: z.enum([DomicileType.Citizen, 'RESIDENT']),
});

export const APPLICANT_IDENTIFICATION = z.object({
  identificationDocuments: generateMultiFileSchema(ACCEPTED_FILES_MIME_TYPES, FILE_SIZE_LIMIT_IN_MEGABYTES, MINIMUM_NUMBER_OF_FILES, MAXIMUM_NUMBER_OF_FILES),
});

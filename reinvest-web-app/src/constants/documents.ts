import { zodResolver } from '@hookform/resolvers/zod';
import { PartialMimeTypeKeys } from 'reinvest-app-common/src/constants/mime-types';
import { generateMultiFileSchema } from 'reinvest-app-common/src/form-schemas/files';
import { z } from 'zod';

export const FILE_SIZE_LIMIT_IN_MEGABYTES = 5;
export const CORPORATE_MINIMUM_NUMBER_OF_DOCUMENTS = 1;
export const CORPORATE_MAXIMUM_NUMBER_OF_DOCUMENTS = 5;
export const ACCEPTED_FILES_MIME_TYPES: PartialMimeTypeKeys = ['pdf', 'png', 'jpeg', 'jpg'];

const CORPORATE_TRUST_DOCUMENTS_SCHEMA = z.object({
  documents: generateMultiFileSchema(
    ACCEPTED_FILES_MIME_TYPES,
    FILE_SIZE_LIMIT_IN_MEGABYTES,
    CORPORATE_MINIMUM_NUMBER_OF_DOCUMENTS,
    CORPORATE_MAXIMUM_NUMBER_OF_DOCUMENTS,
  ),
});

export const CORPORATE_TRUST_DOCUMENTS_SCHEMA_RESOLVER = zodResolver(CORPORATE_TRUST_DOCUMENTS_SCHEMA);

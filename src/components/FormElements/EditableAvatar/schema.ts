import { BYTES_IN_MEGABYTE } from 'constants/conversions';
import { z } from 'zod';

export const getValidationsSchema = (maxFileSizeInMegaBytes: number) => {
  const maxFileSizeInBytes = maxFileSizeInMegaBytes * BYTES_IN_MEGABYTE;

  const schema = z
    .object({
      fileType: z.string(),
      sizeInBytes: z.number().lte(maxFileSizeInBytes, `File must be smaller than ${maxFileSizeInMegaBytes}mb`),
    })
    .superRefine(({ fileType }, context) => {
      const fileIsImage = fileType.startsWith('image/');

      if (!fileIsImage) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'File must be an image',
        });
      }
    });

  return schema;
};

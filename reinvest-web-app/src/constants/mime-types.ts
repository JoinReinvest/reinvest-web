export const MIME_TYPES = {
  pdf: 'application/pdf',
  jpg: 'image/jpg',
  jpeg: 'image/jpeg',
  png: 'image/png',
} as const;

export type MimeTypeKeys = keyof typeof MIME_TYPES;
export type PartialMimeTypeKeys = Partial<MimeTypeKeys>[];

export const MIME_TYPE_KEYS = Object.keys(MIME_TYPES) as MimeTypeKeys[];

/* eslint-disable security/detect-object-injection */
export const mapToMimeType = (keys: PartialMimeTypeKeys): string[] => keys.map(key => MIME_TYPES[key]);

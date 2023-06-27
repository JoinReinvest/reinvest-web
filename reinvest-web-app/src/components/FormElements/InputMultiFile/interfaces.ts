import { ReactNode } from 'react';
import { FieldValues, UseControllerProps } from 'react-hook-form';
import { PartialMimeTypeKeys } from 'reinvest-app-common/src/constants/mime-types';
import { DocumentFile } from 'reinvest-app-common/src/types/document-file';

export interface Props<FormFields extends FieldValues> extends UseControllerProps<FormFields> {
  accepts?: PartialMimeTypeKeys;
  disabled?: boolean;
  iconOnEmpty?: ReactNode;
  iconOnMeetsMinimum?: ReactNode;
  maximumNumberOfFiles?: number;
  minimumNumberOfFiles?: number;
  onClearFileFromApi?: (document: DocumentFile) => void | Promise<void>;
  onFilesChange?: () => void;
  placeholderOnEmpty?: string;
  placeholderOnMeetsMinimum?: string;
  sizeLimitInMegaBytes?: number;
  variant?: 'contained' | 'outlined';
}

import { useRef } from 'react';

import { ContextProviderProps } from '../interfaces';

type Params<FormFields> = Pick<ContextProviderProps<FormFields>, 'formFieldsInitialState' | 'onFormFieldsUpdate'>;

export const useFields = <FormFields>({ formFieldsInitialState, onFormFieldsUpdate }: Params<FormFields>) => {
  const fields = useRef<FormFields>(formFieldsInitialState);

  const getFields = () => fields.current;

  const updateFields = async (fieldsToUpdate: Partial<FormFields>) => {
    const currentFields = getFields();
    const updatedFields = { ...currentFields, ...fieldsToUpdate };

    fields.current = updatedFields;

    if (onFormFieldsUpdate) {
      await onFormFieldsUpdate(updatedFields);
    }
  };

  return { getFields, updateFields };
};

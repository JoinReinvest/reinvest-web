import { BeneficiaryCreationFormFields } from '../form-fields';

export const getBeneficiaryInitials = ({ firstName, lastName }: BeneficiaryCreationFormFields) => {
  const firstLetter = firstName ? firstName[0] : '';
  const secondLetter = lastName ? lastName[0] : '';

  return `${firstLetter}${secondLetter}`.toUpperCase();
};

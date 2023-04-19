import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { InputMultiFile } from 'components/FormElements/InputMultiFile';
import { Typography } from 'components/Typography';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { DocumentFile } from 'reinvest-app-common/src/types/document-file';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'documentsForCorporation'>;

const MINIMUM_NUMBER_OF_FILES = 5;
const MAXIMUM_NUMBER_OF_FILES = 5;

export const StepDocumentsForCorporation: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.DOCUMENTS_FOR_TRUST,

  willBePartOfTheFlow: fields => {
    return fields.accountType === DraftAccountType.Trust;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const defaultValues: Fields = { documentsForCorporation: storeFields.documentsForCorporation || [] };
    const { control, formState, handleSubmit } = useForm<Fields>({
      defaultValues: async () => defaultValues,
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async ({ documentsForCorporation }) => {
      await updateStoreFields({ documentsForCorporation });
      moveToNextStep();
    };

    const subtitle = (
      <Typography variant="paragraph-large">
        <b>Required documents: </b>Articles of Incorporation, Certificate of Formation, By-laws, Shareholders and Authorized Signers List
      </Typography>
    );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onClearFileFromApi = async (document: DocumentFile) => {
      // TO-DO: use mutation to remove the file from the API
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <BlackModalTitle
            title="Upload the following documents to verify your organization."
            subtitle={subtitle}
          />

          <InputMultiFile
            name="documentsForCorporation"
            control={control}
            accepts={['pdf']}
            minimumNumberOfFiles={MINIMUM_NUMBER_OF_FILES}
            maximumNumberOfFiles={MAXIMUM_NUMBER_OF_FILES}
            onClearFileFromApi={onClearFileFromApi}
          />
        </FormContent>

        <ButtonStack>
          <Button
            type="submit"
            label="Continue"
            disabled={shouldButtonBeDisabled}
          />
        </ButtonStack>
      </Form>
    );
  },
};

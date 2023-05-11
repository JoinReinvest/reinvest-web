import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { ModalTitle } from 'components/ModalElements/Title';
import { ScrollArea } from 'components/ScrollArea';
import { FormEventHandler } from 'react';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

const TITLE = 'Subscription Agreement';
const SCROLL_AREA_TITLE = 'Terms of Service for Automatic Reinvesting';
const BUTTON_LABEL = 'Accept';

export const StepSubscriptionAgreement: StepParams<FlowFields> = {
  identifier: Identifiers.SUBSCRIPTION_AGREEMENT,

  willBePartOfTheFlow: fields => {
    return !!fields.optsInForAutomaticDividendReinvestment;
  },

  doesMeetConditionFields: fields => {
    const requiredFields = [fields._selectedAccount, fields.investmentAmount !== undefined, !!fields.optsInForAutomaticDividendReinvestment];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({ updateStoreFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const onSubmit: FormEventHandler<HTMLFormElement> = async event => {
      event.preventDefault();
      await updateStoreFields({ approvesSubscriptionAgreement: true });
      moveToNextStep();
    };

    return (
      <Form onSubmit={onSubmit}>
        <FormContent willLeaveContentOnTop>
          <ModalTitle
            title={TITLE}
            isTitleCenteredOnMobile={false}
          />

          <ScrollArea title={SCROLL_AREA_TITLE}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque odit quis laudantium, quos deleniti earum asperiores alias facilis corporis quod
            optio, sint distinctio nisi a ab. Consectetur, esse. Dolore, rem. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint magnam quibusdam
            non? Adipisci tenetur est ullam saepe beatae laboriosam rerum praesentium, ducimus eaque reprehenderit dolores ut hic nihil veniam inventore? Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Delectus quasi ab porro voluptatibus modi aliquam officia quibusdam dolorem eius molestias non
            nam voluptates quaerat accusantium eaque, repellat, incidunt, dolorum maiores. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum qui
            eum, esse maiores sequi voluptatem quasi voluptates tenetur laborum velit nobis aliquid quaerat totam recusandae, saepe sint placeat adipisci.
            Dicta? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae earum amet non harum provident consequatur soluta dignissimos, maiores
            reiciendis voluptate cumque quibusdam, porro eos nisi ratione quis dolorum. Consequatur, rem! Lorem ipsum, dolor sit amet consectetur adipisicing
            elit. A deserunt esse doloremque quam, temporibus quisquam beatae sequi magni facere, sint ullam eum in ut numquam saepe asperiores repellat facilis
            consequuntur! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos suscipit similique recusandae nulla consequuntur veritatis iste
            doloremque possimus quas, praesentium perspiciatis natus accusamus maiores totam blanditiis tenetur autem? Ipsa, dolor.
          </ScrollArea>
        </FormContent>

        <ButtonStack>
          <Button
            type="submit"
            label={BUTTON_LABEL}
          />
        </ButtonStack>
      </Form>
    );
  },
};

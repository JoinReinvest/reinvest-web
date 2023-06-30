import { Indicator, Root } from '@radix-ui/react-checkbox';
import { IconCheckmark } from 'assets/icons/IconCheckmark';
import { AgreementParagraph } from 'reinvest-app-common/src/types/graphql';

type PrimitiveProps = Pick<AgreementParagraph, 'isCheckedOption'>;
type Props = PrimitiveProps;

/**
 * This checkbox should be disabled by default - if `isCheckedOption` is
 * not a `boolean` then we don't display the checkbox at all.
 */
export function ParagraphCheckbox({ isCheckedOption }: Props) {
  if (isCheckedOption === null || isCheckedOption === undefined) {
    return <></>;
  }

  return (
    <Root
      className="hkek-checkbox flex items-center justify-center"
      checked={isCheckedOption}
      disabled
    >
      <Indicator className="max-h-full max-w-full">
        <IconCheckmark className="max-h-full max-w-full" />
      </Indicator>
    </Root>
  );
}

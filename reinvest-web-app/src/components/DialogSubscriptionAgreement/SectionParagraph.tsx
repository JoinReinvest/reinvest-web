import { AgreementParagraph, Maybe } from 'reinvest-app-common/src/types/graphql';

import { ParagraphCheckbox } from './ParagraphCheckbox';
import { ParagraphLine } from './ParagraphLine';

interface Props {
  paragraph: Maybe<AgreementParagraph>;
}

export const SectionParagraph = ({ paragraph }: Props) => (
  <div className="flex gap-8">
    <ParagraphCheckbox isCheckedOption={paragraph?.isCheckedOption} />

    <div className="flex flex-col gap-4">
      {paragraph?.lines.map((line, index) => (
        <ParagraphLine
          key={index}
          line={line}
        />
      ))}
    </div>
  </div>
);

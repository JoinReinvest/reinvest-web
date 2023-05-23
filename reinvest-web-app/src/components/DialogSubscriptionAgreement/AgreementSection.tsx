import { Typography } from 'components/Typography';
import { SubscriptionAgreementSection } from 'reinvest-app-common/src/types/graphql';

import { SectionParagraph } from './SectionParagraph';

interface Props {
  section: SubscriptionAgreementSection;
}

export const AgreementSection = ({ section }: Props) => (
  <section className="flex flex-col gap-12">
    <Typography variant="h6">{section?.header}</Typography>

    <article className="flex flex-col gap-8">
      {section?.paragraphs?.map((paragraph, index) => (
        <SectionParagraph
          key={index}
          paragraph={paragraph}
        />
      ))}
    </article>
  </section>
);

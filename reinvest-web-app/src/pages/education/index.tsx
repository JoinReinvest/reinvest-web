import { IconChart } from 'assets/icons/Education/IconChart';
import { IconHome } from 'assets/icons/Education/IconHome';
import hero from 'assets/images/education-hero.png';
import { EducationCard, EducationCardProps } from 'components/Education/Card';
import { Typography } from 'components/Typography';
import Image from 'next/image';

import { MainLayout } from '../../layouts/MainLayout';

const educationCards: EducationCardProps[] = [
  {
    title: 'Commercial Real Estate Underwriting Calculator',
    subtitle: 'Calculate your underwriting income in a few easy steps',
    icon: <IconHome />,
    buttonText: 'View Calculator',
  },
  {
    title: 'Real Estate 101 Glossary',
    subtitle: 'Equip yourself with the language of the industry',
    icon: <IconChart />,
    buttonText: 'View Glossary',
  },
];

const renderCard = (card: EducationCardProps) => (
  <EducationCard
    key={card.title}
    {...card}
  />
);

const Index = () => {
  return (
    <MainLayout>
      <div className="relative flex w-full text-white">
        <Typography
          variant="h3"
          className="absolute bottom-24 left-24 lg:bottom-32 lg:left-32"
        >
          Education
        </Typography>
        <Image
          alt="Education"
          src={hero}
          className="w-full object-cover object-top"
        />
      </div>
      <section>
        <Typography
          variant="h5"
          className="my-24"
        >
          Learn About Real Estate Investing
        </Typography>
        <div className="flex flex-col gap-16 lg:flex-row">{educationCards.map(renderCard)}</div>
      </section>
    </MainLayout>
  );
};

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default Index;

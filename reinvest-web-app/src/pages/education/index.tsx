import { IconChart } from 'assets/icons/Education/IconChart';
import { IconHome } from 'assets/icons/Education/IconHome';
import image1 from 'assets/images/education/image1.png';
import image2 from 'assets/images/education/image2.png';
import image3 from 'assets/images/education/image3.png';
import image4 from 'assets/images/education/image4.png';
import image5 from 'assets/images/education/image5.png';
import hero from 'assets/images/education-hero.png';
import { BlogCard, BlogCardProps } from 'components/Education/BlogCard';
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

const blogCards: BlogCardProps[] = [
  {
    imageSrc: image1,
    subtitle: 'with Brandon Rule',
    title: 'Real Estate Investment 101',
  },
  {
    imageSrc: image2,
    subtitle: 'with Brandon Rule',
    title: 'Getting Started with REINVEST',
  },
  {
    imageSrc: image3,
    subtitle: 'with Brandon Rule',
    title: 'Getting Started with REINVEST',
  },
  {
    imageSrc: image4,
    subtitle: 'April 3th, 2022',
    title: 'Project update lorem ipsum dolor sit amet',
  },
  {
    imageSrc: image5,
    subtitle: 'April 3th, 2022',
    title: 'Project update lorem ipsum dolor sit amet',
  },
  {
    imageSrc: image5,
    subtitle: 'April 3th, 2022',
    title: 'Project update lorem ipsum dolor sit amet',
  },
];

const renderCard = (card: EducationCardProps) => (
  <EducationCard
    key={card.title}
    {...card}
  />
);

const renderBlogCard = (card: BlogCardProps) => (
  <BlogCard
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
      <section className="mb-24 lg:mb-44">
        <Typography
          variant="h5"
          className="my-24"
        >
          Learn the basics
        </Typography>
        <div className="flex flex-col gap-16 lg:grid lg:grid-cols-3 lg:gap-y-36">{blogCards.map(renderBlogCard)}</div>
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

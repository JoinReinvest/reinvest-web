import { IconChart } from 'assets/icons/Education/IconChart';
import { IconHome } from 'assets/icons/Education/IconHome';
import hero from 'assets/images/education-hero.png';
import { BlogCard } from 'components/Education/BlogCard';
import { EducationCard, EducationCardProps } from 'components/Education/Card';
import { Typography } from 'components/Typography';
import Image from 'next/image';
import { Suspense } from 'react';

import { URL } from '../../constants/urls';
import { MainLayout } from '../../layouts/MainLayout';
import { BlogPostInterface, getLatestBlogPosts } from '../../services/blogPostsService';

interface EducationPageProps {
  posts: BlogPostInterface[];
}

const educationCards: EducationCardProps[] = [
  {
    title: 'Commercial Real Estate Underwriting Calculator',
    subtitle: 'Calculate your underwriting income in a few easy steps',
    icon: <IconHome />,
    buttonText: 'View Calculator',
    href: URL.calculator,
  },
  {
    title: 'Real Estate 101 Glossary',
    subtitle: 'Equip yourself with the language of the industry',
    icon: <IconChart />,
    buttonText: 'View Glossary',
    href: URL.glossary,
  },
];

const renderCard = (card: EducationCardProps) => (
  <EducationCard
    key={card.title}
    {...card}
  />
);

const renderBlogCard = (card: BlogPostInterface) => (
  <Suspense fallback={<div>Loading ...</div>}>
    <BlogCard
      key={card.title}
      {...card}
    />
  </Suspense>
);

const EducationPage = ({ posts }: EducationPageProps) => {
  return (
    <MainLayout>
      <div className="relative flex min-h-180 w-full text-white">
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
          className="my-32"
        >
          Learn About Real Estate Investing
        </Typography>
        <div className="flex flex-col gap-16 lg:flex-row">{educationCards.map(renderCard)}</div>

        <Typography
          variant="h5"
          className="my-32"
        >
          Learn the basics
        </Typography>
        <div className="flex flex-col gap-16 lg:grid lg:grid-cols-3 lg:gap-y-36">{posts.map(renderBlogCard)}</div>
      </section>
    </MainLayout>
  );
};

export async function getStaticProps() {
  return {
    props: {
      protected: true,
      posts: await getLatestBlogPosts(),
    },
  };
}

export default EducationPage;

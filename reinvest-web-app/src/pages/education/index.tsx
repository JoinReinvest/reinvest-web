import { IconChart } from 'assets/icons/Education/IconChart';
import { IconHome } from 'assets/icons/Education/IconHome';
import hero from 'assets/images/education-hero.png';
import { BlogCard, BlogPostInterface } from 'components/Education/BlogCard';
import { EducationCard, EducationCardProps } from 'components/Education/Card';
import { Typography } from 'components/Typography';
import { URL } from 'constants/urls';
import { usePosts } from 'hooks/posts';
import { MainLayout } from 'layouts/MainLayout';
import Image from 'next/image';

const educationCards: EducationCardProps[] = [
  {
    title: 'Commercial Real Estate Underwriting Calculator',
    subtitle: 'Calculate your underwriting income in a few easy steps',
    icon: <IconHome className="h-110 lg:h-auto" />,
    buttonText: 'View Calculator',
    href: URL.calculator,
  },
  {
    title: 'Real Estate 101 Glossary',
    subtitle: 'Equip yourself with the language of the industry',
    icon: <IconChart className="h-120 lg:h-auto" />,
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

export const renderBlogCard = (card: BlogPostInterface) => (
  <BlogCard
    key={card.title}
    {...card}
  />
);

const EducationPage = () => {
  const { posts, meta } = usePosts();

  const hasPosts = meta.isSuccess && !!posts.length;
  const arePostsReady = !!hasPosts && !meta.isLoading;

  return (
    <MainLayout>
      <div className="relative -mx-20 flex min-h-240 text-white lg:mx-0 lg:min-h-180 lg:w-full">
        <Typography
          variant="h3"
          className="absolute bottom-24 left-24 z-10 lg:bottom-32 lg:left-32"
        >
          Education
        </Typography>

        <div className="absolute bottom-0 h-1/2 w-full bg-gradient-to-b from-transparent to-black-01" />

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
        {meta.isLoading && (
          <Typography
            variant="h6"
            className="text-center"
          >
            Loading...
          </Typography>
        )}

        {arePostsReady && <div className="flex flex-col gap-16 lg:grid lg:grid-cols-3 lg:gap-y-36">{posts.map(renderBlogCard)}</div>}
      </section>
    </MainLayout>
  );
};

export function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default EducationPage;

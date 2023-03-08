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

import { MainLayout } from '../../layouts/MainLayout'

interface EducationPageProps {
  posts: BlogCardProps[]
}

const educationCards: EducationCardProps[] = [
  {
    title: 'Commercial Real Estate Underwriting Calculator',
    subtitle: 'Calculate your underwriting income in a few easy steps',
    icon: <IconHome />,
    buttonText: 'View Calculator',
    href: '/',
  },
  {
    title: 'Real Estate 101 Glossary',
    subtitle: 'Equip yourself with the language of the industry',
    icon: <IconChart />,
    buttonText: 'View Glossary',
    href: '/',
  },
];

const blogCards: BlogCardProps[] = [
  {
    imageSrc: image1,
    subtitle: 'with Brandon Rule',
    title: 'Real Estate Investment 101',
    href: '/',
  },
  {
    imageSrc: image2,
    subtitle: 'with Brandon Rule',
    title: 'Getting Started with REINVEST',
    href: '/',
  },
  {
    imageSrc: image3,
    subtitle: 'with Brandon Rule',
    title: 'Getting Started with REINVEST',
    href: '/',
  },
  {
    imageSrc: image4,
    subtitle: 'April 3th, 2022',
    title: 'Project update lorem ipsum dolor sit amet',
    href: '/',
  },
  {
    imageSrc: image5,
    subtitle: 'April 3th, 2022',
    title: 'Project update lorem ipsum dolor sit amet',
    href: '/',
  },
  {
    imageSrc: image5,
    subtitle: 'April 3th, 2022',
    title: 'Project update lorem ipsum dolor sit amet',
    href: '/',
  },
];

const renderCard = (card: EducationCardProps) => (
  <EducationCard
    key={card.title}
    {...card}
  />
)

const renderBlogCard = (card: BlogCardProps) => (
  <BlogCard
    key={card.title}
    {...card}
  />
)

const EducationPage = ({ posts }: EducationPageProps) => {
  return (
    <MainLayout>
      <div className="relative flex w-full text-white min-h-180">
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
  )
}

export async function getStaticProps () {
  try {
    const data = await fetch(`${env.site.url}/api/posts`)
    const posts = await data.json()
  } catch (e) {
    console.log(e)
  }

  return {
    props: {
      protected: true,
      posts: posts.data,
    },
  }
}

export default EducationPage

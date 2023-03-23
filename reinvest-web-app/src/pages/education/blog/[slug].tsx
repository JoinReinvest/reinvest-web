import { GetStaticPropsContext } from 'next';

import { BlogPostInterface } from '../../../components/Education/BlogCard';
import { env } from '../../../env';
import { FullWidthContentLayout } from '../../../layouts/FullWidthContentLayout';
import { fetcher } from '../../../services/fetcher';

export interface ArticlePageProps {
  protected: boolean;
  slug: string;
}

const ArticlePage = ({ slug }: ArticlePageProps) => {
  return (
    <FullWidthContentLayout>
      <iframe
        src={`${env.site.url}/blog-iframe/${slug}`}
        className="h-full w-full"
        title="Blog page"
      />
    </FullWidthContentLayout>
  );
};

export async function getStaticPaths() {
  const data = await fetcher(`${env.site.url}/api/posts`);

  const paths = data ? data.data.map((article: BlogPostInterface) => ({ params: { slug: article.slug } })) : [];

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps(context: GetStaticPropsContext): Promise<{ props: ArticlePageProps }> {
  return {
    props: {
      slug: context.params?.slug as string,
      protected: true,
    },
  };
}

export default ArticlePage;

import { GetStaticPropsContext } from 'next';

import { BlogPostInterface } from '../../../components/Education/BlogCard';
import { env } from '../../../env';
import { FullWidthContentLayout } from '../../../layouts/FullWidthContentLayout';
import { fetcher } from '../../../services/fetcher';

export interface ArticlePageProps {
  slug: string;
}

const ArticlePage = ({ slug }: ArticlePageProps) => {
  return (
    <FullWidthContentLayout>
      <iframe
        src={`${env.site.url}/blog/${slug}?iframe=true`}
        className="h-screen w-full"
        title="Blog page"
      />
    </FullWidthContentLayout>
  );
};

export async function getStaticPaths() {
  const data = await fetcher(`${env.appUrl}/api/posts`);

  const paths = data ? data.data.map((article: BlogPostInterface) => ({ params: { slug: article.slug } })) : [];

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context: GetStaticPropsContext): Promise<{ props: ArticlePageProps }> {
  return {
    props: {
      slug: context.params?.slug as string,
    },
  };
}

export default ArticlePage;

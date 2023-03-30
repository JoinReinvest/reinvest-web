import { env } from 'env';
import { FullWidthContentLayout } from 'layouts/FullWidthContentLayout';
import { GetStaticPropsContext } from 'next';
import { makeRequest } from 'services/api-request';
import { GetPostsResponse } from 'types/site-api';

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
  const url = `${env.site.url}/api/posts`;
  const response = await makeRequest<GetPostsResponse>({ url, method: 'GET' });
  const parsedData: GetPostsResponse = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
  const posts = parsedData.data || [];
  const paths = posts.map(article => ({ params: { slug: article.slug } }));

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

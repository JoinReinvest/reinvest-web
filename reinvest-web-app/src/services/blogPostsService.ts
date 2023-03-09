import { env } from '../env';

export interface BlogPostInterface {
  data: string;
  slug: string;
  title: string;
  image?: {
    alt: string;
    height: number;
    src: string;
    width: number;
  };
}

export const generateBlogPostUrl = (slug: string): string => `${env.site.url}/api/posts/${slug}`;

export const getLatestBlogPosts = async (): Promise<BlogPostInterface[]> => {
  const data = await fetch(`${env.site.url}/api/posts`);
  const postsJsonString = await data.json();
  const posts = JSON.parse(postsJsonString);

  return posts.data;
};

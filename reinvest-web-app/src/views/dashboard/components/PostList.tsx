import { BlogPostInterface } from 'components/Education/BlogCard';
import { renderBlogCard } from 'pages/education';

interface Props {
  arePostsReady: boolean;
  posts: BlogPostInterface[];
}

export const PostList = ({ arePostsReady, posts }: Props) => (
  <>{arePostsReady && <div className="mt-16 flex flex-col gap-16 lg:mt-24 lg:grid lg:grid-cols-3 lg:gap-y-36">{posts.map(renderBlogCard)}</div>}</>
);

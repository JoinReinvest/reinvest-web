import { BlogPostInterface } from 'components/Education/BlogCard';

export interface GetPostsResponse {
  data: BlogPostInterface[];
  success: boolean;
}

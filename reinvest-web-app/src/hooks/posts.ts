import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { QueryMeta } from 'types/queries';
import { GetPostsResponse } from 'types/site-api';

const QUERY_KEYS = ['posts'];
const URL = '/api/posts';

interface Returns {
  meta: QueryMeta;
  posts: GetPostsResponse['data'];
}

export function usePosts(): Returns {
  const { data, ...meta } = useQuery<GetPostsResponse>({
    queryKey: QUERY_KEYS,
    queryFn: () => fetch(URL).then(res => res.json()),
  });

  const posts = useMemo(() => data?.data || [], [data]);

  return { posts, meta: { ...meta, isSuccess: !!data?.success } };
}

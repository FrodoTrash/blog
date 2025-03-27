'use client';

import { PostItem } from '@/components/post/post-item';
import { getPosts } from '@/lib/actions';
import { Post } from '@/types/definitions';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

// export function PostList() {
//   const {
//     data: posts,
//     isLoading,
//     isError,
//     error,
//   } = useQuery<Post[]>({
//     queryKey: ['posts'],
//     queryFn: getPosts,
//   });
//   if (isLoading) return <p>Loading posts...</p>;
//   if (error) return <p>{error.message}</p>;
//   if (!posts) return <p>No posts found.</p>;
//   return (
//     <div className="space-y-6">
//       {posts?.map((post) => (
//         <PostItem key={post.$id} post={post} />
//       ))}
//     </div>
//   );
// }

export function PostList() {
  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  const postItems = useMemo(() => {
    if (!posts) {
      return null;
    }

    return posts.map((post) => <PostItem key={post.$id} post={post} />);
  }, [posts]);

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Error: {error?.message}</p>;
  if (!posts) return <p>No posts found.</p>;

  return <div className="space-y-6">{postItems}</div>;
}

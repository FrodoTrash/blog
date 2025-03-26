'use client';

import { PostItem } from '@/components/post/post-item';
import { getPosts } from '@/lib/actions';
// import { usePosts } from '@/lib/hooks/usePosts';
import { Post } from '@/types/definitions';
import { useQuery } from '@tanstack/react-query';

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
  if (isLoading) return <p>Loading posts...</p>;
  if (error) return <p>{error.message}</p>;
  if (!posts) return <p>No posts found.</p>;
  return (
    <div className="space-y-6">
      {posts &&
        posts.length > 0 &&
        posts.map((post) => <PostItem key={post.$id} post={post} />)}
    </div>
  );
}

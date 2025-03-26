import { PostCreator } from '@/components/post/post-creator';
import { PostList } from '@/components/post/post-list';

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto p-4 space-y-6">
      <PostCreator />
      <PostList />
    </main>
  );
}

import { PostCreator } from '@/components/post/post-creator';
import { PostList } from '@/components/post/post-list';
import { getLoggedInUser } from '@/lib/server/appwrite';
import { redirect } from 'next/navigation';

export default async function Home() {
  const user = await getLoggedInUser();

  if (!user) redirect('/login');

  return (
    <main className="max-w-5xl mx-auto p-4 space-y-6">
      <h1>Welcome, {user.name}</h1>
      {user.email === 'mheybal@gmail.com' && <PostCreator />}
      <PostList />
    </main>
  );
}

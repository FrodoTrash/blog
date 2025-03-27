import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './theme-toggle';
import Link from 'next/link';
import { getLoggedInUser, signOut } from '@/lib/server/appwrite';

export async function SiteHeader() {
  const user = await getLoggedInUser();
  return (
    <header className="border-b p-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-purple-500"></div>
        <Link href="/">
          <h1 className="text-xl font-bold"></h1>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Shield className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>
        </div>
        <ThemeToggle />

        {user ? (
          <form action={signOut}>
            <Button
              type="submit"
              variant="ghost"
              className="bg:white text-black hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 cursor-pointer"
            >
              Sign Out
            </Button>
          </form>
        ) : (
          <Link href="/login">
            <Button
              variant="ghost"
              className="bg:white text-black hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 cursor-pointer"
            >
              Login
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}

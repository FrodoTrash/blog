import { RegisterForm } from '@/components/auth/register-form';
import { getLoggedInUser } from '@/lib/server/appwrite';
import { redirect } from 'next/navigation';

export default async function RegisterPage() {
  const user = await getLoggedInUser();
  if (user) redirect('/');

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </div>
  );
}

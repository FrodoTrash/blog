'use server';

import { Client, Account, ID } from 'node-appwrite';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || '')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

  const session = await (await cookies()).get('session');
  if (!session || !session.value) {
    throw new Error('No session');
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    console.error('Frodo Error getting logged in user:', error);
    return null;
  }
}

export async function signInWithEmail(email: string, password: string) {
  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? '')
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? '')
      .setKey(
        'standard_5ab3ea65d5d8bfb847d9147912be07a18b8d5ab902b6377c65e3d50df5d59ba4233cced03943312746d149594e70e1425dd9762c0603cec17e9c5e52fa68d4fe530f234fe7c404a51c6539a18c2c78542732a23171ceafa7efbfa9a78a7c60f10eaaead9b6d0ee6b0d23d26d2e41b1829736efea35a21f9ee344a3582e7340fb'
      );

    const account = new Account(client);

    const session = await account.createEmailPasswordSession(email, password);

    (await cookies()).set('session', session.secret, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });

    redirect('/');
  } catch (error) {
    throw error;
  }
}

export async function signOut() {
  const { account } = await createSessionClient();

  (await cookies()).delete('session');
  await account.deleteSession('current');

  redirect('/login');
}

export async function SignUpWithEmail(
  email: string,
  password: string,
  name: string
) {
  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? '')
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? '')
      .setKey(
        'standard_5ab3ea65d5d8bfb847d9147912be07a18b8d5ab902b6377c65e3d50df5d59ba4233cced03943312746d149594e70e1425dd9762c0603cec17e9c5e52fa68d4fe530f234fe7c404a51c6539a18c2c78542732a23171ceafa7efbfa9a78a7c60f10eaaead9b6d0ee6b0d23d26d2e41b1829736efea35a21f9ee344a3582e7340fb'
      );

    const account = new Account(client);

    await account.create(ID.unique(), email, password, name);
    const session = await account.createEmailPasswordSession(email, password);

    (await cookies()).set('session', session.secret, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });

    redirect('/');
  } catch (error) {
    throw error;
  }
}

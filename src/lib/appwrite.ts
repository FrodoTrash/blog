import { Client, Account, Databases } from 'appwrite';

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || '')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

// Check if the client is connected
try {
  await client.ping();
  console.log('✅ Successfully connected to Appwrite');
} catch (error) {
  console.error('❌ Failed to connect to Appwrite:', error);
}

// Initialize Appwrite services
export const account = new Account(client);
export const databases = new Databases(client);

const MAIN = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const POSTS_COLLECTION = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_POSTS!;
const COMMENTS_COLLECTION =
  process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_COMMENTS!;
const LIKES_COLLECTION = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_LIKES!;

export const diarydb = {
  database_id: MAIN,
  collections: {
    posts: POSTS_COLLECTION,
    comments: COMMENTS_COLLECTION,
    likes: LIKES_COLLECTION,
  },
};

import { diarydb, databases } from './appwrite';
import { Query } from 'appwrite';
import { Post } from '@/types/definitions';

// Post functions
export async function getPosts(): Promise<Post[]> {
  try {
    const response = await databases.listDocuments<Post>(
      diarydb.database_id,
      diarydb.collections.posts,
      [Query.orderDesc('$createdAt'), Query.limit(100)]
    );
    // console.log('Fetched posts:', response.documents);

    return response.documents;
  } catch (error) {
    // console.error('Error fetching posts:', error);
    throw error;
  }
}

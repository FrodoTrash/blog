import { diarydb, databases, account } from './appwrite';
import { Query } from 'appwrite';
import { Post } from '@/types/definitions';

// auth functions
export async function login(email: string, password: string) {
  try {
    const response = await account.createEmailPasswordSession(email, password);
    console.log('Login successful:', response);
    return response;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}
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

export async function createPost(
  title: string,
  content: string,
  image: File | null
) {
  try {
    const post = {
      title,
      content,
      // image: image ? await uploadImage(image) : null,
    };
    const response = await databases.createDocument(
      diarydb.database_id,
      diarydb.collections.posts,
      'unique()',
      post
    );
    console.log('Post created:', response);
    return response;
  } catch (error) {
    console.error('Error creating post:', error);
    return null;
  }
}

export async function deletePost(postId: string) {
  try {
    const response = await databases.deleteDocument(
      diarydb.database_id,
      diarydb.collections.posts,
      postId
    );
    console.log('Post deleted:', response);
    return response;
  } catch (error) {
    console.error('Error deleting post:', error);
    return null;
  }
}

export async function likePost(postId: string, userId: string) {
  try {
    const response = await databases.createDocument(
      diarydb.database_id,
      diarydb.collections.likes,
      'unique()',
      {
        postId,
        userId,
      }
    );
    console.log('Post liked:', response);
    return response;
  } catch (error) {
    console.error('Error liking post:', error);
    throw error;
  }
}

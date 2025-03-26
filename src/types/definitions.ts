import { Models } from 'appwrite';

export type Post = Models.Document & {
  title: string;
  content: string;
  likes: number;
  comments: Comment[];
};

export type Comment = Models.Document & {
  content: string;
};

export type Like = Models.Document & {
  userId: string;
};

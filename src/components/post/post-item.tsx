'use client';

import { Heart, MessageCircle, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Post } from '@/types/definitions';
import { DateTime } from 'luxon';

export function PostItem({ post }: { post: Post }) {
  return (
    <Card key={post.$id} className="border border-gray-800">
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground">
          <span>{DateTime.fromISO(post.$createdAt).toRelative()}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p>{post.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-4">
          <Button
            variant="ghost"
            size="sm"
            // onClick={() => onLike(post.$id)}
            className={post.likes ? 'text-red-500' : ''}
          >
            <Heart
              className="h-4 w-4 mr-2"
              fill={post.likes ? 'currentColor' : 'none'}
            />
            {post.likes}
          </Button>
          <Button variant="ghost" size="sm">
            <MessageCircle className="h-4 w-4 mr-2" />
            {post.comments.length}
          </Button>
        </div>
        <div className="flex gap-2 items-center">
          <Button variant="ghost" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            // onClick={() => deletePost(post.$id)}
            // disabled={}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

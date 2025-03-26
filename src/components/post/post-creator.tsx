'use client';

import { useState } from 'react';
import { Image, Link2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

export function PostCreator() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  return (
    <Card className="border border-dashed">
      <CardContent className="pt-6 space-y-4">
        <Input
          placeholder="Title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Write a new diary entry..."
          className="min-h-24"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex justify-between">
          <div className="flex gap-4">
            <Button variant="ghost" size="sm">
              <Image className="h-4 w-4 mr-2" />
              Add Image
            </Button>
          </div>
          <Button>
            <Send className="h-4 w-4 mr-2" />
            Post
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

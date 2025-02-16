import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import type { Post } from '@/types/post';

async function getPost(slug: string): Promise<Post | null> {
  try {
    const postsDirectory = path.join(process.cwd(), 'posts');
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = await fs.readFile(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      ...data,
      slug,
      content,
    } as Post;
  } catch (error) {
    console.error('Error reading post:', error);
    return null;
  }
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Post Not Found</h1>
        <p className="text-gray-600">
          Sorry, the blog post you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <time className="text-gray-500 block mb-4">
          {new Date(post.date).toLocaleDateString()}
        </time>
        {post.description && (
          <p className="text-xl text-gray-600">{post.description}</p>
        )}
      </header>
      <div className="prose lg:prose-xl">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
} 
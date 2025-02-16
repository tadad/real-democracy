import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Post } from '@/types/post';
import MarkdownRenderer from '@/components/MarkdownRenderer';

function getReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

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
      readingTime: getReadingTime(content),
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
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
          <p className="text-yellow-700">
            Sorry, the blog post you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
          <time>
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          {post.readingTime && (
            <>
              <span>·</span>
              <span>{post.readingTime}</span>
            </>
          )}
        </div>
        {post.description && (
          <p className="text-xl text-gray-600 mb-4">{post.description}</p>
        )}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>
      <MarkdownRenderer content={post.content} />
    </article>
  );
} 
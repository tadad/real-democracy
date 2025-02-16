import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import type { PostMeta } from '@/types/post';

function getReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

function getExcerpt(content: string, maxLength: number = 200): string {
  // Remove markdown headings and code blocks
  const plainText = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/#{1,6}\s.*\n/g, '')   // Remove headings
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'); // Replace links with just their text

  if (plainText.length <= maxLength) return plainText;
  
  // Find the last complete sentence within the maxLength
  const truncated = plainText.slice(0, maxLength);
  const lastSentence = truncated.match(/^.*?[.!?](?:\s|$)/);
  
  return lastSentence 
    ? lastSentence[0].trim() 
    : truncated.slice(0, truncated.lastIndexOf(' ')) + '...';
}

async function getPosts(): Promise<PostMeta[]> {
  const postsDirectory = path.join(process.cwd(), 'posts');
  
  try {
    const files = await fs.readdir(postsDirectory);
    const posts = await Promise.all(
      files
        .filter(filename => filename.endsWith('.md'))
        .map(async filename => {
          const filePath = path.join(postsDirectory, filename);
          const fileContents = await fs.readFile(filePath, 'utf8');
          const { data, content } = matter(fileContents);
          
          return {
            ...data,
            slug: filename.replace(/\.md$/, ''),
            readingTime: getReadingTime(content),
            excerpt: getExcerpt(content),
          } as PostMeta;
        })
    );
    
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      {posts.length > 0 ? (
        <div className="space-y-12">
          {posts.map(post => (
            <article key={post.slug} className="border-b pb-8">
              <Link href={`/blog/${post.slug}`} className="block group">
                <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600">
                  {post.title}
                </h2>
                <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
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
                  <p className="text-gray-600 mb-4">{post.description}</p>
                )}
                {post.excerpt && (
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                )}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
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
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
          <p className="text-yellow-700">
            No blog posts found. Add some Markdown files to the posts directory to get started.
          </p>
        </div>
      )}
    </div>
  );
} 
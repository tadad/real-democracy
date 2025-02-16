import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import type { PostMeta } from '@/types/post';

async function getPosts(): Promise<PostMeta[]> {
  const postsDirectory = path.join(process.cwd(), 'posts');
  
  try {
    const files = await fs.readdir(postsDirectory);
    const posts = await Promise.all(
      files.map(async filename => {
        const filePath = path.join(postsDirectory, filename);
        const fileContents = await fs.readFile(filePath, 'utf8');
        const { data } = matter(fileContents);
        
        return {
          ...data,
          slug: filename.replace(/\.md$/, ''),
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
        <div className="space-y-8">
          {posts.map(post => (
            <article key={post.slug} className="border-b pb-8">
              <Link href={`/blog/${post.slug}`} className="block group">
                <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600">
                  {post.title}
                </h2>
                <time className="text-gray-500 mb-2 block">
                  {new Date(post.date).toLocaleDateString()}
                </time>
                {post.description && (
                  <p className="text-gray-600">{post.description}</p>
                )}
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">
          No blog posts found. Add some Markdown files to the posts directory to get started.
        </p>
      )}
    </div>
  );
} 
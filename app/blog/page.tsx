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
    .replace(/#{1,6}\s.*\n/g, '') // Remove headings
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
  const postsDirectory = path.join(process.cwd(), 'content', 'blogs');

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
    <div className="container-lg markdown-body wrapper">
      <div className="leftcolumn" />
      <div className="midcolumn">
        <main>
          <div className="notes-entry-container note">
            <div className="content post-content">
              <header className="mb-8">
                <Link
                  href="/"
                  className="text-sm text-gray-500 hover:text-accent mb-4 inline-block"
                >
                  ← Back to Home
                </Link>
                <h1 className="text-4xl font-bold mb-4">Blog Posts</h1>
              </header>

              {posts.length > 0 ? (
                <div className="space-y-12">
                  {posts.map(post => (
                    <article key={post.slug} className="post-preview mb-12 pb-8 border-b">
                      <Link href={`/blog/${post.slug}`} className="block group">
                        <h2 className="text-3xl font-bold mb-4 group-hover:text-accent">
                          {post.title}
                        </h2>
                        <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                          <time dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
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
                        {post.excerpt && !post.description && (
                          <p className="text-xl text-gray-600 mb-4">{post.excerpt}</p>
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
                    No blog posts found. Add some Markdown files to the posts directory to get
                    started.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
        <div className="license">
          <div>
            <a className="internal-link" href="https://viralpubliclicense.org">
              VIRAL PUBLIC LICENSE
              <br />
              Copyleft (ɔ) All Rights Reversed
            </a>
          </div>
        </div>
      </div>
      <div className="rightcolumn" />
    </div>
  );
}

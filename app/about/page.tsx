import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Post } from '@/types/post';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import Link from 'next/link';
import type { Metadata } from 'next';

function getReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

async function getAboutContent(): Promise<Post | null> {
  try {
    const postsDirectory = path.join(process.cwd(), 'posts');
    const fullPath = path.join(postsDirectory, 'about.md');
    const fileContents = await fs.readFile(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      ...data,
      slug: 'about',
      content,
      readingTime: getReadingTime(content),
    } as Post;
  } catch (error) {
    console.error('Error reading about page:', error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const post = await getAboutContent();
  
  if (!post) {
    return {
      title: 'About - Not Found',
      description: 'The about page content could not be found.',
    };
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: ['Your Name'],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      creator: '@yourusername',
    },
  };
}

export default async function AboutPage() {
  const post = await getAboutContent();

  if (!post) {
    return (
      <div className="container-lg markdown-body wrapper">
        <div className="leftcolumn" />
        <div className="midcolumn">
          <div className="notes-entry-container note">
            <div className="content post-content">
              <h1 className="text-4xl font-bold mb-8">Content Not Found</h1>
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
                <p className="text-yellow-700">
                  Sorry, the about page content could not be found.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="rightcolumn" />
      </div>
    );
  }

  return (
    <div className="container-lg markdown-body wrapper">
      <div className="leftcolumn" />
      <div className="midcolumn">
        <main>
          <article>
            <div className="notes-entry-container note">
              <div className="content post-content">
                <header className="mb-8">
                  <Link href="/" className="text-sm text-gray-500 hover:text-accent mb-4 inline-block">
                    ← Back to Home
                  </Link>
                  <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                  <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                    <time dateTime={post.date}>
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
              </div>
            </div>
          </article>
        </main>
        <div className="license">
          <div>
            <a className="internal-link" href="https://viralpubliclicense.org">
              VIRAL PUBLIC LICENSE
              <br/>
              Copyleft (ɔ) All Rights Reversed
            </a>
          </div>
        </div>
      </div>
      <div className="rightcolumn" />
    </div>
  );
} 
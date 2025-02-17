import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Post } from '@/types/post';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import type { Metadata } from 'next';
import React from 'react';

async function getPost(slug: string): Promise<Post | null> {
  try {
    const postsDirectory = path.join(process.cwd(), 'content', 'blogs');
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

// @ts-ignore
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: post.title,
    description: post.description || `Read ${post.title} on My Blog`,
    keywords: post.tags,
    authors: [{ name: 'Your Name' }],
    openGraph: {
      title: post.title,
      description: post.description || `Read ${post.title} on My Blog`,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

// @ts-ignore
export default async function BlogPost({ params }: any) {
  const post = await getPost(params.slug);

  if (!post) {
    return (
      <div className="container-lg markdown-body wrapper">
        <div className="leftcolumn" />
        <div className="midcolumn">
          <div className="notes-entry-container note">
            <div className="content post-content">
              <h1 className="text-4xl font-bold mb-8">Post Not Found</h1>
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
                <p className="text-yellow-700">
                  Sorry, the blog post you&apos;re looking for doesn&apos;t exist.
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
                  <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                  <div
                    className="flex items-center text-sm text-gray-500 mb-4 space-x-4"
                    style={{ textAlign: 'center' }}
                  >
                    {post.date && (
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    )}
                  </div>
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
              <br />
              Copyleft (ɔ) All Rights Reversed
            </a>
          </div>
        </div>
      </div>
      <div className="rightcolumn">{/* <section className="toc-right"></section> */}</div>
    </div>
  );
}

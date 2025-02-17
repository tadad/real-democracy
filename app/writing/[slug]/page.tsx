import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Post } from '@/types/post';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import License from '@/components/License';
import PostContainer from '@/components/PostContainer';
import type { Metadata } from 'next';
import React from 'react';

async function getPost(slug: string): Promise<Post | null> {
  try {
    const postsDirectory = path.join(process.cwd(), 'content', 'writing');
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
      description: 'The requested post could not be found.',
    };
  }

  return {
    title: post.title,
    description: post.description || post.title,
    keywords: post.tags,
    authors: [{ name: 'Dachus' }],
    openGraph: {
      title: post.title,
      description: post.description || post.title,
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
        <PostContainer post={post} />
        <License />
      </div>
      <div className="rightcolumn">{/* <section className="toc-right"></section> */}</div>
    </div>
  );
}

import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Post } from '@/types/post';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import Link from 'next/link';
import type { Metadata } from 'next';
import License from '@/components/License';
import PostContainer from '@/components/PostContainer';

async function getAboutContent(): Promise<Post | null> {
  try {
    const contentDirectory = path.join(process.cwd(), 'content', 'pages');
    const fullPath = path.join(contentDirectory, 'about.md');
    const fileContents = await fs.readFile(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      ...data,
      slug: 'about',
      content,
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
                <p className="text-yellow-700">Sorry, the about page content could not be found.</p>
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
        <PostContainer post={post} showBackToHome={true} />
        <License />
      </div>
      <div className="rightcolumn" />
    </div>
  );
}

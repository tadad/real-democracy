import { promises as fs } from 'fs';
import path from 'path';
import { MetadataRoute } from 'next';

type Route = {
  url: string;
  lastModified: Date;
};

async function getBlogPosts(): Promise<Route[]> {
  const postsDirectory = path.join(process.cwd(), 'posts');
  try {
    const files = await fs.readdir(postsDirectory);
    return files
      .filter(file => file.endsWith('.md'))
      .map(file => ({
        url: `/writing/${file.replace(/\.md$/, '')}`,
        lastModified: new Date(),
      }));
  } catch (error) {
    console.error('Error reading blog posts for sitemap:', error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getBlogPosts();

  const routes: MetadataRoute.Sitemap = [
    {
      url: 'https://0xgov.org',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://0xgov.org/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://0xgov.org/writing',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  const postRoutes: MetadataRoute.Sitemap = blogPosts.map(post => ({
    url: `https://0xgov.org${post.url}`,
    lastModified: post.lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...routes, ...postRoutes];
}

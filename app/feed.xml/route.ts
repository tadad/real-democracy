import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { PostMeta } from '@/types/post';

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

async function getPosts(): Promise<(PostMeta & { content: string })[]> {
  const postsDirectory = path.join(process.cwd(), 'content', 'writing');

  try {
    const files = await fs.readdir(postsDirectory);
    const posts = await Promise.all(
      files
        .filter(filename => filename.endsWith('.md'))
        .map(async filename => {
          try {
            const filePath = path.join(postsDirectory, filename);
            const fileContents = await fs.readFile(filePath, 'utf8');
            const { data, content } = matter(fileContents);

            // Ensure required fields exist
            if (!data.title) {
              throw new Error(`Missing title in ${filename}`);
            }
            
            if (!data.date) {
              // Use file modification time as fallback for date
              const stats = await fs.stat(filePath);
              data.date = stats.mtime.toISOString().split('T')[0];
            }

            const postData = {
              title: data.title,
              date: data.date,
              slug: filename.replace(/\.md$/, ''),
              description: data.description || '',
              tags: Array.isArray(data.tags) ? data.tags : [],
              excerpt: getExcerpt(content),
              content, // Include content for RSS description
            };

            return postData;
          } catch (fileError) {
            console.error(`Error processing ${filename}:`, fileError);
            // Return a minimal valid post to avoid breaking the entire feed
            return {
              title: `Untitled (${filename})`,
              date: new Date().toISOString(),
              slug: filename.replace(/\.md$/, ''),
              description: '',
              tags: [],
              excerpt: '',
              content: '',
            };
          }
        })
    );

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
}

function escapeCdata(text: string): string {
  return text.replace(/]]>/g, ']]]]><![CDATA[>');
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  try {
    const posts = await getPosts();
    const siteUrl = 'https://0xgov.org';
    const feedUrl = `${siteUrl}/feed.xml`;
    const lastBuildDate = new Date().toUTCString();
    
    // Generate RSS XML
    let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>0xgov - Writing</title>
    <link>${siteUrl}/writing</link>
    <description>Articles about blockchain, decentralized government, and politics</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
`;

    // Add items
    for (const post of posts) {
      try {
        if (!post.title || !post.date || !post.slug) {
          console.warn('Skipping post with missing required fields:', post);
          continue;
        }
        
        const postUrl = `${siteUrl}/writing/${post.slug}`;
        
        // Make sure date is valid
        let pubDate;
        try {
          pubDate = new Date(post.date).toUTCString();
          // Check if date is valid
          if (pubDate === 'Invalid Date') {
            pubDate = new Date().toUTCString();
          }
        } catch (dateError) {
          console.warn('Invalid date for post:', post.slug, post.date);
          pubDate = new Date().toUTCString();
        }
        
        const title = escapeHtml(post.title);
        const excerpt = escapeHtml(post.excerpt || '');
        
        // Make sure content is a string and clean it up for RSS
        const contentStr = typeof post.content === 'string' ? post.content : '';
        const content = contentStr
          .replace(/---[\s\S]*?---/, '') // Remove frontmatter
          .trim();
          
        rss += `    <item>
      <title>${title}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${escapeCdata(excerpt)}]]></description>
      <content:encoded><![CDATA[${escapeCdata(content)}]]></content:encoded>`;
        
        // Only add tags if they exist and are an array
        if (Array.isArray(post.tags) && post.tags.length > 0) {
          rss += '\n      ' + post.tags.map(tag => `<category>${escapeHtml(String(tag))}</category>`).join('\n      ');
        }
        
        rss += `
    </item>
`;
      } catch (itemError) {
        console.error('Error processing RSS item:', itemError);
        // Skip problematic items instead of breaking the whole feed
        continue;
      }
    }

    rss += `  </channel>
</rss>`;

    return new Response(rss, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    // Return a minimal valid RSS feed in case of error
    const errorFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>0xgov - Writing</title>
    <link>https://0xgov.org/writing</link>
    <description>Articles about blockchain, decentralized governance, and politics</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <item>
      <title>Feed Error</title>
      <link>https://0xgov.org/writing</link>
      <description>There was an error generating the feed. Please try again later.</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>
  </channel>
</rss>`;
    
    return new Response(errorFeed, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    });
  }
}
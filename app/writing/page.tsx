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

async function getPosts(): Promise<PostMeta[]> {
  const postsDirectory = path.join(process.cwd(), 'content', 'writing');

  try {
    const files = await fs.readdir(postsDirectory);
    const posts = await Promise.all(
      files
        .filter(filename => filename.endsWith('.md'))
        .map(async filename => {
          const filePath = path.join(postsDirectory, filename);
          const fileContents = await fs.readFile(filePath, 'utf8');
          const { data, content } = matter(fileContents);

          const postData = {
            ...data,
            slug: filename.replace(/\.md$/, ''),
            excerpt: getExcerpt(content),
          } as PostMeta;

          return postData;
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
    <main>
      <section className="container-lg">
        <div className="leftcolumn-borderless">
          <div className="sidebar-card related">
            <h1>
              <a className="red" href="/">
                0xgov
              </a>
            </h1>
            <h2>
              <a className="silent-link" href="/writing">
                Writing
              </a>
            </h2>
            <h2>
              <a className="silent-link" href="/important-links">
                Important Links
              </a>
            </h2>
          </div>
        </div>

        <div className="midcolumn-borderless">
          <div className="index-card">
            <div className="index-header">
              <div id="spinner"></div>
              <p style={{ textAlign: 'left' }}>
                <b>Index: Posts</b>
                <br />
                Showing {posts.length} items
              </p>
            </div>

            <div className="index-grid">
              {posts.length > 0 ? (
                posts.map(post => (
                  <a key={post.slug} className="index-anchor" href={`/writing/${post.slug}`}>
                    <div className="index-item">
                      <span className="index-item-title">{post.title}</span>
                      <br />
                      <span className="index-item-date">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                      <div className="index-item-excerpt">{post.excerpt}</div>
                    </div>
                  </a>
                ))
              ) : (
                <p>No blog posts found.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

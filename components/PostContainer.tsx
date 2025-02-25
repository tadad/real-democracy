import React from 'react';
import type { Post } from '@/types/post';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import Link from 'next/link';

interface PostContainerProps {
  post: Post;
  showBackToHome?: boolean;
}

export default function PostContainer({ post, showBackToHome = true }: PostContainerProps) {
  return (
    <main>
      <article>
        <div className="notes-entry-container note">
          <div className="content post-content">
            {/* <header className="mb-8">
              {showBackToHome && (
                <Link
                  href="/"
                  className="text-sm text-gray-500 hover:text-accent mb-4 inline-block"
                >
                  ← Back to Home
                </Link>
              )}
              <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
              <div
                className="flex items-center text-sm text-gray-500 mb-4 space-x-4"
                style={{ textAlign: 'center' }}
              >

              </div>
            </header> */}
            <div className="post-info">
              <div className="date-nav">
                <p>
                  <a className="prev" href="/writing">
                    ← Back
                  </a>
                  {post.date && (
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  )}
                  <a className="next" href="">
                    {' '}
                  </a>
                </p>
              </div>
              <div className="title">
                <h1 className="title-text">{post.title}</h1>
              </div>
              <div className="subtitle">
                <h2 className="subtitle-text">{post.description}</h2>
              </div>
              {/* <div className="tags">
                <p>
                  <b>Tags:&nbsp;</b>
                  {post.tags &&
                    post.tags?.map((tag, index) => (
                      <React.Fragment key={tag}>
                        <a href={`/tags/#${tag.toLowerCase()}`}>
                        {tag}
                        </a>
                        {index < post.tags!.length - 1 && ' | '}
                      </React.Fragment>
                    ))}
                </p>
              </div> */}
              {/* <div className="post-image">
                <a href="https://dons.directory/images/presswurst.png"><img src="/images/presswurst.png" className="border"></a>
              </div> */}
              {/* <section className="toc-main">
                <div className="content toc-container">
                  <h1 className="toc-header">Table of Contents</h1>
                  <ol className="inline_toc" id="my_toc"><li><a href="#the-full-stack-kitchen">The Full Stack Kitchen</a><ol><li><a href="#essentials">Essentials</a></li></ol></li><li><a href="#the-full-stack-home-gym">The Full Stack Home Gym</a></li><li><a href="#reasonable-physical-standards">Reasonable Physical Standards</a></li><li><a href="#images">Images</a></li></ol></div>
              </section> */}
            </div>
            <MarkdownRenderer content={post.content} />
          </div>
        </div>
      </article>
    </main>
  );
}

import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="container-lg markdown-body wrapper">
      <div className="midcolumn-home">
        <div className="home-double">
          <div></div>
          <div className="title">
            <h1 className="title-text">0xgov</h1>
          </div>

          <div className="sidebar-card related">
            <h2>
              <Link className="silent-link" href="/writing">
                Writing
              </Link>
            </h2>
            <h2>
              <Link className="silent-link" href="/webring">
                Webring
              </Link>
            </h2>
            <h2>
              <Link className="silent-link" href="/about">
                About
              </Link>
            </h2>
            <h2>
              <Link className="silent-link" href="https://x.com/dac_hus">
                X.com
              </Link>
            </h2>
            <h2>
              <Link 
                className="silent-link rss-link" 
                href="/feed.xml" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                RSS
              </Link>
            </h2>
          </div>
          <Image
            src="/image.png"
            alt="0xgov"
            width={500}
            height={300}
            className="home-img-container"
          />
        </div>
      </div>
    </div>
  );
}
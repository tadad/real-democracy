import Link from 'next/link';
import Image from 'next/image';
// import MarkdownRenderer from '@/components/MarkdownRenderer';

// const content = `
// Paper-bound bureaucracy has choked the lifeblood of internet revolution.

// 0xgov is the cutting edge of crypto government, exploring how blockchain, cryptocurrency, and decentralized tech replace the boomer-gov.
// We are a platform to discuss, prototype, and broadcast a new vision for sovereign internet-native governments, societies, and legal systems.

// 0xgov Issue 1 drops in summer 2025.
// Submit your articles, research, essays, and creative works to [Dachus](https://x.com/dac_hus) via dm.
// `

export default function Home() {
  return (
    <div className="container-lg markdown-body wrapper">
      <div className="midcolumn-home">
        <div className="home-double">
          <div></div>
          <div className="title">
            <h1 className="title-text">0xgov</h1>
            {/* <h2 className="subtitle-text" style={{ marginTop: '0', marginBottom: '0' }}>
              writing by +!+ Dachus  +!+
            </h2> */}
          </div>

          <div className="sidebar-card related">
            <h2>
              <Link className="silent-link" href="/writing">
                Writing
              </Link>
            </h2>
            <h2>
              <Link className="silent-link" href="/important-links">
                Important Links
              </Link>
            </h2>
            <h2>
              <Link className="silent-link" href="https://x.com/dac_hus">
                X.com
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
          {/* <div></div>
          <MarkdownRenderer content={content} /> */}
        </div>
      </div>
    </div>
  );
}

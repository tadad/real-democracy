import Link from 'next/link';
import Image from 'next/image';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import License from '@/components/License';

const content = `
Centralized institutions and paper-bound bureaucracy have choked the lifeblood of internet revolution.
0xgov is the cutting edge of crypto government, exploring how blockchain, cryptocurrency, and decentralized tech replace the boomer-gov.
We are a platform to discuss, prototype, and broadcast a new vision for sovereign internet-native governments and societies.

0xgov Issue 1 drops in summer 2025.
Submit your articles, research, essays, and creative works to [Dachus](https://x.com/dac_hus) via dm.
We want technical deep dives, visionary manifestos, and speculative fiction that turns dystopia into possibility.
`

export default function Home() {
  return (
    <div className="container-lg markdown-body wrapper">
      <div className="midcolumn-home">
        <div className="home-double">
          <div></div>
          <div className="title">
            <h1 className="title-text">0xgov</h1>
            <h2 className="subtitle-text" style={{ marginTop: '0', marginBottom: '0' }}>
              +!+!+!+!+!+!+!+!+!+!+!+!+
            </h2>
          </div>

          <div className="sidebar-card related">
            <h2>
              <Link className="silent-link" href="/writing">
                Writing
              </Link>
            </h2>
            <h2>
              <Link className="silent-link" href="/about">
                About
              </Link>
            </h2>
            {/* <h2><a className="silent-link" href="/dairy-index">Diary</a></h2> */}
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
          <div></div>
          <MarkdownRenderer content={content} />
        </div>
      </div>
    </div>
  );
}

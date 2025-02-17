import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="container-lg markdown-body wrapper">
      <div className="midcolumn-home">
        <div className="home-double">
          <div></div>
          <div className="title">
            <h1 className="title-text">Real Democracy</h1>
            <h2 className="subtitle-text" style={{ marginTop: '0', marginBottom: '0' }}>
              +!+!+!+!+!+!+!+!+!+!+!+!+
            </h2>
          </div>

          <div className="sidebar-card related">
            <h2>
              <Link className="silent-link" href="/blog">
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
            alt="REAL DEMOCRACY"
            width={500}
            height={300}
            className="home-img-container"
          />
        </div>
      </div>
    </div>
  );
}

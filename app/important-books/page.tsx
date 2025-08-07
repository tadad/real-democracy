
interface LinkData {
  name: string;
  author: string;
  link: string;
}

const links: LinkData[] = [
  {
    name: "We Want to Live",
    author: "Aajonus Vonderplanitz",
    link: "https://www.amazon.com/We-Want-to-Live/dp/B001UIXBG6"
  },
  {
    name: "The Recipe for Living Without Disease",
    author: "Aajonus Vonderplanitz",
    link: "https://www.amazon.com/Recipe-Living-Without-Disease/dp/1889356840"
  },
  {
    name: "Songs of Innocence and Experience",
    author: "William Blake",
    link: "https://www.amazon.com/Songs-Innocence-Experience-1789-1794-Paperbacks/dp/0192810898"
  },
  {
    name: "Generative Energy",
    author: "Ray Peat",
    link: "https://www.amazon.com/Generative-Energy-Restoring-Wholeness-Life/dp/B0006PA9N2"
  },
  {
    name: "Unqualified Reservations",
    author: "Mencius Moldbug",
    link: "https://passage.press/products/ur1"
  },
  {
    name: "Empire of the Summer Moon",
    author: "S.C. Gwynne",
    link: "https://www.amazon.com/Quanah-Parker-Empire-Summer-Moon/dp/B0DR78DN13"
  },
  {
    name: "Debt: The First 5,000 Years",
    author: "David Graeber",
    link: "https://www.amazon.com/dp/1612194192"
  },
  {
    name: "A Century of War",
    author: "F. William Engdahl",
    link: "https://www.amazon.com/Century-War-Anglo-American-Politics-World-ebook/dp/B005Y4EZWQ/"
  }
];

export default function ExternalLink() {
  return (
    <>
      <table className="pre-archive" style={{ "textAlign": "right" }}>
        <tbody>
          <tr>
            <td>
              <a className="archive-anchor" href="/"> Home</a>
              <a className="archive-anchor" href="/writing">Writing</a>
              <a className="archive-anchor" href="/important-links">Important Links</a>
              <a className="archive-anchor" href="https://x.com/dac_hus">X.com</a>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="external-link-container">
        <table className="external-link-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {links.map((item, index) => (
              <tr key={index}>
                <td>
                  {item.name}
                </td>
                <td>
                  {item.author}
                </td>
                <td>
                  <a href={item.link} style={{ "fontWeight": "bold" }} target="_blank" rel="noopener noreferrer">
                    {item.link}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

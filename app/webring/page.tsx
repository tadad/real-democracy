
interface LinkData {
  name: string;
  link: string;
}

const links: LinkData[] = [
  {
    name: "Exo-Science",
    link: "http://exo-science.com/",
  },
  {
    name: "Dons Directory",
    link: "https://dons.directory/",
  },
  {
    name: "Remilia Corporation",
    link: "https://www.remilia.org/",
  },
  {
    name: "The Mars Review of Books",
    link: "https://store.marsreview.org/",
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
              <a className="archive-anchor" href="/about"> About</a>
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
                  <a href={item.link} style={{ "fontWeight": "bold" }}>
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

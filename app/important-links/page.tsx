
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
    name: "Eat Wild",
    link: "https://www.eatwild.com/",
  },
  {
    name: "Aajonus.net",
    link: "https://aajonus.net/"
  },
  {
    name: "Peaty Sharing Repo",
    link: "https://github.com/peatysharing/bibliography",
  },
  {
    name: "Open Theory by Michael Edward Johnson",
    link: "https://opentheory.net/"
  },
  {
    name: "Literature.bio: The Most Important Biological Texts",
    link: "https://literature.bio/",
  },
  {
    name: "Longest Levers: Static Protocols for Dynamic Lives",
    link: "https://longestlevers.com/"
  },
  {
    name: "Dons Directory",
    link: "https://dons.directory/",
  },
  {
    name: "Healthfully",
    link: "https://healthfully.ai/"
  },
  {
    name: "Based Physics",
    link: "https://www.basedphysics.com/"
  },
  {
    name: "XCELA",
    link: "https://xcela.org/"
  },
  {
    name: "Passage Press",
    link: "https://passage.press/"
  },
  {
    name: "Remilia Corporation",
    link: "https://www.remilia.org/",
  },
  {
    name: "The Mars Review of Books",
    link: "https://store.marsreview.org/",
  },
  {
    name: "Chadnet",
    link: "https://chadnet.org/"
  },
  {
    name: "Crazy Horse Memorial",
    link: "https://www.crazyhorsememorial.org/"
  },
  {
    name: "American Prairie",
    link: "https://americanprairie.org/"
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

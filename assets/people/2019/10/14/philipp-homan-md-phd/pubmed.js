document.addEventListener("DOMContentLoaded", function () {
  const authorRaw = "Homan P";
  const tag = "Psychiatry";
  const retmax = 10;

  const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent('"' + authorRaw + '"[Author]' + (tag ? ' AND ' + tag : ''))}&retmode=json&retmax=${retmax}&sort=pub+date`;

  fetch(searchUrl)
    .then(res => res.json())
    .then(data => {
      const ids = data.esearchresult.idlist;
      if (!ids.length) {
        document.getElementById("pubmed-results").innerText = "No publications found.";
        return;
      }

      const efetchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${ids.join(",")}&retmode=xml`;
      return fetch(efetchUrl);
    })
    .then(res => res.text())
    .then(xmlText => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(xmlText, "application/xml");
      const articles = [...xml.querySelectorAll("PubmedArticle")];
      const container = document.getElementById("pubmed-results");
      const byYear = {};

      articles.forEach(article => {
        const title = article.querySelector("ArticleTitle")?.textContent || "(no title)";
        const journal = article.querySelector("Journal > Title")?.textContent || "(no journal)";
        const year = article.querySelector("PubDate > Year")?.textContent || "Unknown";
        const month = article.querySelector("PubDate > Month")?.textContent || "";
        const day = article.querySelector("PubDate > Day")?.textContent || "";
        const date = `${month} ${day}`.trim();

        const authors = [...article.querySelectorAll("Author")].map(a => {
          const last = a.querySelector("LastName")?.textContent;
          const init = a.querySelector("Initials")?.textContent;
          return last && init ? `${last} ${init}` : null;
        }).filter(Boolean);

        const idMap = {};
        article.querySelectorAll("ArticleId").forEach(id => {
          idMap[id.getAttribute("IdType")] = id.textContent;
        });

        const doi = idMap["doi"];
        const pmcid = idMap["pmc"];
        const pmid = idMap["pubmed"];

        const authorList = authors.map(name => {
          const regex = new RegExp(authorRaw, "i");
          return name.replace(regex, `<strong>${authorRaw}</strong>`);
        }).join(" ; ");

        const html = `
          <div class="pub-entry">
            <em>Journal Article</em><br>
            ${authorList}<br>
            <strong>${title}</strong><br>
            <span style="font-style: italic;">${journal}</span> (${year} ${date})<br>
            ${doi ? `<a href="https://doi.org/${doi}" target="_blank">${doi}</a><br>` : ""}
            ${pmcid ? `
              <span class="badge open-access">Open Access</span>
              <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/${pmcid}/" target="_blank"><span class="badge">Full text</span></a>` : ""}
            ${doi ? `
              <div class="altmetric-embed" data-badge-type="1x1" data-badge-popover="right" data-doi="${doi}"></div>` : ""}
            <a href="https://pubmed.ncbi.nlm.nih.gov/${pmid}" target="_blank">PubMed</a>
            ${doi ? ` | <a href="https://doi2bib.org/bib/${encodeURIComponent(doi)}" target="_blank">BibTeX</a>` : ""}
            | <a href="https://pubmed.ncbi.nlm.nih.gov/${pmid}/?format=pmid" target="_blank">EndNote</a>
            | <a href="https://pubmed.ncbi.nlm.nih.gov/${pmid}/?format=ris" target="_blank">RIS</a>
          </div><br><br>
        `;

        if (!byYear[year]) byYear[year] = [];
        byYear[year].push(html);
      });

      const sortedYears = Object.keys(byYear).sort((a, b) => b - a);
      container.innerHTML = sortedYears.map(year => `<h3>${year}</h3>${byYear[year].join("")}`).join("");

      if (typeof window._altmetric_embed_init === 'function') {
        window._altmetric_embed_init();
      }
    })
    .catch(err => {
      console.error(err);
      document.getElementById("pubmed-results").innerText = "Error loading publications.";
    });
});


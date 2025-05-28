document.addEventListener("DOMContentLoaded", function () {
  const authorRaw = "Homan P"; // Change as needed
  const tag = "Psychiatry";              // Optional tag (e.g. "Psychiatry")
  const apiKey = "";           // Optional NCBI API key
  const retmax = 100;

  const authorTag = `"${authorRaw}"[Author]`;
  const searchTerm = tag ? `${authorTag} AND ${tag}` : authorTag;

  const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(searchTerm)}&retmode=json&retmax=${retmax}&sort=pub+date${apiKey ? '&api_key=' + apiKey : ''}`;

  fetch(searchUrl)
    .then(res => res.json())
    .then(data => {
      const ids = data.esearchresult.idlist;
      if (ids.length === 0) {
        document.getElementById('pubmed-results').innerText = 'No publications found.';
        return;
      }

      const summaryUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${ids.join(',')}&retmode=json${apiKey ? '&api_key=' + apiKey : ''}`;
      return fetch(summaryUrl);
    })
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('pubmed-results');
      container.innerHTML = '';
      const articles = data.result;
      const uids = (articles.uids || Object.keys(articles)).filter(k => k !== 'uids');

      uids.sort((a, b) => {
        const dateA = new Date(articles[a].pubdate || '1900');
        const dateB = new Date(articles[b].pubdate || '1900');
        return dateB - dateA;
      });

      const byYear = {};
      for (const uid of uids) {
        const a = articles[uid];
        if (!a.authors || !a.pubdate) continue;
        const year = (new Date(a.pubdate)).getFullYear();
        if (!byYear[year]) byYear[year] = [];
        byYear[year].push({ uid, ...a });
      }

      const sortedYears = Object.keys(byYear).sort((a, b) => b - a);

      for (const year of sortedYears) {
        container.insertAdjacentHTML('beforeend', `<h3>${year}</h3>`);
        byYear[year].forEach(entry => {
          const title = entry.title || '(no title)';
          const journal = entry.fulljournalname || '(no journal)';
          const pubdate = entry.pubdate || '';
          const elocationid = entry.elocationid || '';
          const pmcid = entry.pmc || null;
          const pubtype = entry.pubtype?.[0] || "Journal Article";

          const doiMatch = elocationid.match(/10\.\d{4,9}\/[-._;()\/:A-Z0-9]+/i);
          const doi = doiMatch ? doiMatch[0] : null;

          const boldRegex = new RegExp(authorRaw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
          const authorList = entry.authors.map((auth, i, arr) => {
            let name = auth.name.replace(boldRegex, `<strong>${authorRaw}</strong>`);
            if (i === 0) return `${name} (First author)`;
            if (i === arr.length - 1) return `${name} (Last author)`;
            return name;
          }).join(' ; ');

          const html = `
            <p>
              <em>${pubtype}</em><br>
              <div class="meta">${authorList}</div>
              <strong>${title}</strong><br>
              <span style="font-style: italic;">${journal}</span> (${pubdate})<br>
              ${doi ? `<a href="https://doi.org/${doi}" target="_blank">${doi}</a><br>` : ''}
              ${doi ? `
                <div class="altmetric-embed"
                     data-badge-type="1x1"
                     data-badge-popover="right"
                     data-doi="${doi}">
                </div>` : ''}
              <a href="https://pubmed.ncbi.nlm.nih.gov/${entry.uid}" target="_blank">PubMed</a> |
              ${doi ? `<a href="https://doi2bib.org/bib/${encodeURIComponent(doi)}" target="_blank">BibTeX</a> |` : ''}
              <a href="https://pubmed.ncbi.nlm.nih.gov/${entry.uid}/?format=pmid" target="_blank">EndNote</a> |
              <a href="https://pubmed.ncbi.nlm.nih.gov/${entry.uid}/?format=ris" target="_blank">RIS</a>
            </p>
          `;

          container.insertAdjacentHTML('beforeend', html);
        });
      }

      // Reinitialize Altmetric badges after DOM updates
      setTimeout(() => {
        if (typeof window._altmetric_embed_init === 'function') {
          window._altmetric_embed_init();
        }
      }, 100);
    })
    .catch(err => {
      document.getElementById('pubmed-results').innerText = 'Error loading publications.';
      console.error(err);
    });
});

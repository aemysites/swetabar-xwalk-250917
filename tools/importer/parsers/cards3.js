/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get all immediate children (each card)
  const cardDivs = element.querySelectorAll(':scope > div');
  const headerRow = ['Cards (cards3)'];
  const rows = [headerRow];

  cardDivs.forEach((cardDiv) => {
    // Find icon/image (first .icon img)
    let iconImg = null;
    const iconDiv = cardDiv.querySelector('.icon');
    if (iconDiv) {
      iconImg = iconDiv.querySelector('img');
    }

    // Find text content (first <p> with utility-margin-bottom-0)
    let textContent = null;
    const textP = cardDiv.querySelector('p.utility-margin-bottom-0');
    if (textP) {
      textContent = textP;
    }

    // First cell: icon image (mandatory)
    // Second cell: text content (mandatory)
    // Defensive: if missing, cell is empty
    rows.push([
      iconImg ? iconImg : '',
      textContent ? textContent : ''
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

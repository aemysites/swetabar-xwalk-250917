/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as specified
  const headerRow = ['Cards (cards3)'];
  const rows = [headerRow];

  // Get all immediate card containers (each card is a direct child div)
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach(cardDiv => {
    // Find the icon image (mandatory)
    let iconImg = null;
    const iconDiv = cardDiv.querySelector('.icon');
    if (iconDiv) {
      iconImg = iconDiv.querySelector('img');
    }

    // Find the text content (mandatory)
    let textContent = null;
    // The text is always in a <p> with class 'utility-margin-bottom-0'
    textContent = cardDiv.querySelector('p.utility-margin-bottom-0');

    // Defensive: If no icon or text, skip this card
    if (!iconImg && !textContent) return;

    // First cell: icon image (must be element)
    const iconCell = iconImg ? iconImg : document.createTextNode('');
    // Second cell: text content (must be element)
    const textCell = textContent ? textContent : document.createTextNode('');

    rows.push([iconCell, textCell]);
  });

  // Create the block table and replace the original element
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(blockTable);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as specified
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  // Defensive: get all direct child <a> elements (each is a card)
  const cardLinks = Array.from(element.querySelectorAll(':scope > a'));

  cardLinks.forEach((cardLink) => {
    // Each card's main content is inside the <a>
    // Find image (mandatory)
    const img = cardLink.querySelector('img');
    // Find the content container (the div after the image)
    const parentGrid = img ? img.parentElement : null;
    let textContentDiv = null;
    if (parentGrid) {
      // Find the div that is a sibling after the image
      const children = Array.from(parentGrid.children);
      const imgIdx = children.indexOf(img);
      textContentDiv = children[imgIdx + 1] || null;
    }
    // Defensive: fallback if structure changes
    if (!textContentDiv) {
      // Try to find the deepest div with text content
      const divs = Array.from(cardLink.querySelectorAll('div'));
      textContentDiv = divs.find(div => div.querySelector('h3, p, .tag, .paragraph-sm')) || cardLink;
    }
    // First cell: image (mandatory)
    // Second cell: text content (title, desc, meta, CTA)
    rows.push([
      img || '',
      textContentDiv || ''
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

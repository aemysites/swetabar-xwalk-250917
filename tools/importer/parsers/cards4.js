/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from each <a> card element
  function extractCardInfo(cardEl) {
    // Find image (mandatory)
    const img = cardEl.querySelector('img');
    // Find the inner content container (contains tag, time, heading, desc, CTA)
    const inner = cardEl.querySelector('div:not([class])');
    let contentParts = [];
    if (inner) {
      // Tag and time (optional, can be grouped)
      const tagRow = inner.querySelector('.flex-horizontal');
      if (tagRow) {
        contentParts.push(tagRow);
      }
      // Heading (optional)
      const heading = inner.querySelector('h3, .h4-heading');
      if (heading) {
        contentParts.push(heading);
      }
      // Description (optional)
      const desc = inner.querySelector('p');
      if (desc) {
        contentParts.push(desc);
      }
      // CTA (optional, bottom text)
      // If there's a CTA, it's usually a div with text 'Read' after the paragraph
      const ctaCandidates = Array.from(inner.querySelectorAll('div'));
      const cta = ctaCandidates.find(div => div.textContent.trim().toLowerCase() === 'read');
      if (cta) {
        contentParts.push(cta);
      }
    }
    // Defensive: ensure image is always present, content can be empty
    return [img, contentParts.length ? contentParts : ''];
  }

  // Get all card <a> elements (direct children of the grid)
  const cardLinks = Array.from(element.querySelectorAll(':scope > a'));

  // Build the table rows
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];
  cardLinks.forEach(cardEl => {
    rows.push(extractCardInfo(cardEl));
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}

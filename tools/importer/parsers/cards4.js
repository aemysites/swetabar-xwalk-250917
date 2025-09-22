/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from each <a> card element
  function extractCardContent(card) {
    // Find the image (mandatory)
    const img = card.querySelector('img');
    // Find the text content container (the div after the img)
    const textContainer = img && img.nextElementSibling;
    let textContent = [];
    if (textContainer) {
      // Tag and read time row (optional)
      const tagRow = textContainer.querySelector('.flex-horizontal');
      if (tagRow) {
        textContent.push(tagRow);
      }
      // Heading (h3)
      const heading = textContainer.querySelector('h3');
      if (heading) {
        textContent.push(heading);
      }
      // Description (p)
      const desc = textContainer.querySelector('p');
      if (desc) {
        textContent.push(desc);
      }
      // CTA (the last div, with text 'Read', but not the tagRow)
      // Find all divs inside textContainer, filter for 'Read'
      const ctaDivs = Array.from(textContainer.querySelectorAll('div'));
      const cta = ctaDivs.find(div => div.textContent.trim() === 'Read' && !div.classList.contains('tag'));
      if (cta) {
        // Make the CTA a link to the card's href
        const a = document.createElement('a');
        a.href = card.href;
        a.textContent = 'Read';
        textContent.push(a);
      }
    }
    return [img, textContent];
  }

  // Get all direct <a> children (cards)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  // Build table rows
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  cards.forEach(card => {
    const [img, textContent] = extractCardContent(card);
    rows.push([
      img,
      textContent
    ]);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

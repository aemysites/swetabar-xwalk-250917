/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get all immediate child divs (each is a column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Each column contains a single image inside a div.utility-aspect-1x1
  // We'll extract the image elements directly
  const images = columns.map(col => {
    // Defensive: find the first img in this column
    const img = col.querySelector('img');
    return img || document.createTextNode('');
  });

  // Build table rows
  const headerRow = ['Columns (columns2)'];
  const contentRow = images;

  const cells = [
    headerRow,
    contentRow
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}

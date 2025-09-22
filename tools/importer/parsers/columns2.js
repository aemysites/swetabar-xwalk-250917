/* global WebImporter */
export default function parse(element, { document }) {
  // Get the immediate children (should be two divs, each with an image)
  const children = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: ensure we have two columns
  const col1 = children[0] || document.createElement('div');
  const col2 = children[1] || document.createElement('div');

  // Build the table rows
  const headerRow = ['Columns (columns2)'];
  const columnsRow = [col1, col2];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  let columns = [];

  if (grid) {
    // Each direct child of the grid is a column
    columns = Array.from(grid.children);
  }

  // Defensive: fallback if grid not found
  if (columns.length === 0) {
    const container = element.querySelector('.container');
    if (container) {
      columns = Array.from(container.children);
    } else {
      columns = Array.from(element.children);
    }
  }

  // Only keep columns with content
  columns = columns.filter(col => col.textContent.trim() !== '' || col.querySelector('svg'));

  // Table header must match block name exactly
  const headerRow = ['Columns (columns8)'];
  // Each column's DOM node as a cell
  const secondRow = columns.map(col => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    secondRow,
  ], document);

  element.replaceWith(table);
}

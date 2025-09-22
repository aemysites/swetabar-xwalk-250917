/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Header row as required
  const headerRow = ['Columns (columns8)'];

  // Second row: each column's content
  // We want each cell to contain the full content of its respective column
  const secondRow = columns.map((col) => col);

  // Table rows array
  const rows = [headerRow, secondRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}

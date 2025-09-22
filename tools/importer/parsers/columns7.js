/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Defensive: If there are less than 2 columns, don't process
  if (columns.length < 2) return;

  // Build the table rows
  const headerRow = ['Columns (columns7)'];

  // The second row: one cell for each column
  const columnsRow = columns.map(col => col);

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per requirements
  const headerRow = ['Columns (columns8)'];

  // Find the main grid container with columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid - each is a column
  const columns = Array.from(grid.children);

  // Defensive: Only keep columns that have content
  const contentColumns = columns.filter(col => col && col.childNodes.length > 0);

  // Second row: one cell per column, each containing the column's content
  // We want to preserve the original elements, not clone or re-create
  const secondRow = contentColumns.map(col => col);

  // Build the table data
  const tableData = [headerRow, secondRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(block);
}

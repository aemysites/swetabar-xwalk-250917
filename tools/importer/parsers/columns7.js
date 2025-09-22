/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container (the columns wrapper)
  const grid = element.querySelector('.grid-layout');
  let columns = [];

  if (grid) {
    // Each direct child of grid is a column cell
    columns = Array.from(grid.children);
  } else {
    // Fallback: treat all direct children as columns
    columns = Array.from(element.children);
  }

  // Always use the required block header
  const headerRow = ['Columns (columns7)'];
  // Each cell in the content row is a reference to the original DOM node
  const contentRow = columns;

  // Create the table block
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

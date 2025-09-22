/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure the element exists and is a container
  if (!element || !document) return;

  // Header row for the block
  const headerRow = ['Columns (columns2)'];

  // Get all immediate children (should be two .utility-aspect-1x1 divs)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: only proceed if there are at least two columns
  if (columnDivs.length < 2) return;

  // Each column cell should contain the full content of its respective div
  // (each div contains an image)
  const columnsRow = columnDivs.map((colDiv) => colDiv);

  // Build the table data
  const tableData = [
    headerRow,
    columnsRow
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}

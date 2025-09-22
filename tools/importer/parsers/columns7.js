/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout for columns
  const grid = element.querySelector('.grid-layout');
  let columns = [];
  if (grid) {
    // Each direct child of grid is a column
    columns = Array.from(grid.children).map((col) => {
      // Collect all child nodes (elements and non-empty text)
      const nodes = Array.from(col.childNodes).filter(n => n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim()));
      if (nodes.length === 1) {
        return nodes[0];
      } else if (nodes.length > 1) {
        // Wrap multiple nodes in a div for semantic grouping
        const wrapper = document.createElement('div');
        nodes.forEach(node => wrapper.appendChild(node));
        return wrapper;
      } else {
        // Fallback: use trimmed text if no children
        return col.textContent.trim();
      }
    });
  }

  // Always use the correct header row
  const headerRow = ['Columns (columns7)'];
  const contentRow = columns.length > 0 ? columns : [''];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the element with the table
  element.replaceWith(table);
}

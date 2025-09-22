/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.children).filter(child => child.matches(selector));
  }

  // 1. Header row
  const headerRow = ['Tabs (tabs5)'];

  // 2. Find tab menu and tab content containers
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabContent = element.querySelector('.w-tab-content');

  if (!tabMenu || !tabContent) {
    // Defensive: If structure is not as expected, do nothing
    return;
  }

  // 3. Get tab labels (order matters)
  const tabLinks = getDirectChildren(tabMenu, 'a');
  // 4. Get tab panes (order matters)
  const tabPanes = getDirectChildren(tabContent, 'div.w-tab-pane');

  // Defensive: if counts mismatch, bail
  if (tabLinks.length !== tabPanes.length || tabLinks.length === 0) {
    return;
  }

  // 5. Build rows: each row is [label, content]
  const rows = tabLinks.map((tabLink, idx) => {
    // Tab label: use textContent of the label div inside the link
    let label = '';
    const labelDiv = tabLink.querySelector('div');
    if (labelDiv) {
      label = labelDiv.textContent.trim();
    } else {
      label = tabLink.textContent.trim();
    }

    // Tab content: get the grid inside the pane
    const pane = tabPanes[idx];
    // Defensive: if no pane, skip
    if (!pane) return null;
    // Find the grid div (first direct child)
    const grid = pane.querySelector('.w-layout-grid, .grid-layout');
    // Defensive: if no grid, use pane itself
    const content = grid || pane;

    return [label, content];
  }).filter(Boolean);

  // 6. Compose table data
  const tableData = [headerRow, ...rows];

  // 7. Create table
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // 8. Replace element
  element.replaceWith(table);
}

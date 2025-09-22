/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate children by selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.children).filter(el => el.matches(selector));
  }

  // 1. Header row
  const headerRow = ['Tabs (tabs5)'];
  const rows = [headerRow];

  // 2. Find tab menu and content containers
  // Get immediate children divs
  const children = Array.from(element.children);
  // Find menu and content by class
  const menu = children.find(
    el => el.classList.contains('w-tab-menu') || el.classList.contains('w-tab-menu')
  );
  const content = children.find(
    el => el.classList.contains('w-tab-content') || el.classList.contains('tabs-content')
  );

  if (!menu || !content) {
    // Defensive: fallback, do nothing
    return;
  }

  // 3. Get tab labels (in order)
  const tabLinks = Array.from(menu.querySelectorAll('a.w-tab-link'));
  // 4. Get tab panes (in order)
  const tabPanes = Array.from(content.querySelectorAll('.w-tab-pane'));

  // Defensive: ensure same number of tabs and panes
  const count = Math.min(tabLinks.length, tabPanes.length);
  for (let i = 0; i < count; i++) {
    const tabLink = tabLinks[i];
    // Tab label: use the text content of the div inside the link (for styling)
    let labelEl = tabLink.querySelector('div');
    if (!labelEl) {
      // fallback to link text
      labelEl = document.createElement('span');
      labelEl.textContent = tabLink.textContent.trim();
    }
    // Tab content: get the content inside the tab pane
    const tabPane = tabPanes[i];
    // The actual content is usually a grid div inside the pane
    let contentDiv = tabPane.querySelector('div');
    let tabContent;
    if (contentDiv) {
      tabContent = contentDiv;
    } else {
      // fallback to the tabPane itself
      tabContent = tabPane;
    }
    rows.push([labelEl, tabContent]);
  }

  // 5. Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

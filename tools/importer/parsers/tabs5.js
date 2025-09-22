/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.children).filter(el => el.matches(selector));
  }

  // 1. Header row
  const headerRow = ['Tabs (tabs5)'];
  const rows = [headerRow];

  // 2. Find tab labels (menu) and tab panes (content)
  // The first child is the tab menu, the second is the tab content
  const [tabMenu, tabContent] = element.querySelectorAll(':scope > div');
  if (!tabMenu || !tabContent) {
    // Defensive: if structure is not as expected, do nothing
    return;
  }

  // Get all tab menu links (labels)
  const tabLinks = Array.from(tabMenu.querySelectorAll(':scope > a'));
  // Get all tab panes (contents)
  const tabPanes = Array.from(tabContent.querySelectorAll(':scope > div'));

  // Defensive: Only pair as many as both have
  const tabCount = Math.min(tabLinks.length, tabPanes.length);

  for (let i = 0; i < tabCount; i++) {
    // Tab label: the text content of the tab menu link's child div
    const tabLink = tabLinks[i];
    // Defensive: sometimes the label is in a div, sometimes directly on the link
    let label = '';
    const labelDiv = tabLink.querySelector('div');
    if (labelDiv) {
      label = labelDiv.textContent.trim();
    } else {
      label = tabLink.textContent.trim();
    }

    // Tab content: the content of the corresponding tab pane
    const tabPane = tabPanes[i];
    // The actual content is usually a grid div inside the pane
    let contentDiv = tabPane.querySelector(':scope > div');
    if (!contentDiv) contentDiv = tabPane; // fallback

    // Place the label as a string, and the contentDiv as an element
    rows.push([label, contentDiv]);
  }

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

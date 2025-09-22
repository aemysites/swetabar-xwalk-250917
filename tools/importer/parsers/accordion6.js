/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block table: header row, then one row per accordion item (2 columns)
  const headerRow = ['Accordion']; // header row as per markdown example
  const rows = [headerRow];

  // Get all direct children that are accordions
  const accordionItems = Array.from(element.querySelectorAll(':scope > .accordion'));

  accordionItems.forEach((accordion) => {
    // Title: find the .w-dropdown-toggle > .paragraph-lg
    const toggle = accordion.querySelector('.w-dropdown-toggle');
    let titleEl = null;
    if (toggle) {
      titleEl = toggle.querySelector('.paragraph-lg') || toggle;
    }

    // Content: find the .accordion-content (nav), then its .rich-text or content
    const contentNav = accordion.querySelector('.accordion-content');
    let contentEl = null;
    if (contentNav) {
      // Try to find .rich-text inside
      contentEl = contentNav.querySelector('.rich-text') || contentNav;
    }

    // Defensive: if either is missing, skip this item
    if (!titleEl || !contentEl) return;

    rows.push([
      titleEl,
      contentEl,
    ]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Ensure the header row is a single cell and all other rows have two cells
  // Remove any colspan from header row
  const firstRow = table.querySelector('tr');
  if (firstRow && firstRow.children.length === 1) {
    firstRow.children[0].removeAttribute('colspan');
  }
  element.replaceWith(table);
}

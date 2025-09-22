/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block header row: plain text, exactly one column, then pad with empty string for column alignment
  const headerRow = ['Accordion', ''];

  // Get all accordion items (immediate children with class 'accordion')
  const accordionItems = Array.from(element.querySelectorAll(':scope > .accordion'));

  // Build rows for each accordion item
  const rows = accordionItems.map((item) => {
    // Title cell: find the toggle div containing the label
    const toggle = item.querySelector('.w-dropdown-toggle');
    let titleCell = '';
    if (toggle) {
      // Find the label inside the toggle (usually .paragraph-lg)
      const label = toggle.querySelector('.paragraph-lg');
      if (label) {
        titleCell = label;
      } else {
        // fallback: use toggle text
        titleCell = document.createTextNode(toggle.textContent.trim());
      }
    }

    // Content cell: find the dropdown list content
    const contentNav = item.querySelector('.accordion-content');
    let contentCell = '';
    if (contentNav) {
      // The actual content is inside a div, which may contain rich text
      const contentWrapper = contentNav.querySelector('.utility-padding-all-1rem, .rich-text, .w-richtext') || contentNav;
      if (contentWrapper) {
        contentCell = contentWrapper;
      } else {
        contentCell = document.createTextNode(contentNav.textContent.trim());
      }
    }

    return [titleCell, contentCell];
  });

  // Compose the table cells array
  const cells = [headerRow, ...rows];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block: 2 columns, first row is header with 'Accordion'
  const rows = [];
  rows.push(['Accordion']); // Header row as in example

  // Each accordion item is a .accordion.w-dropdown direct child
  const accordionItems = element.querySelectorAll(':scope > .accordion.w-dropdown');
  accordionItems.forEach((item) => {
    // Title: inside .w-dropdown-toggle > .paragraph-lg
    let titleCell = '';
    const toggle = item.querySelector('.w-dropdown-toggle');
    if (toggle) {
      const titleDiv = toggle.querySelector('.paragraph-lg');
      if (titleDiv) {
        titleCell = titleDiv;
      } else {
        titleCell = document.createTextNode(toggle.textContent.trim());
      }
    }

    // Content: inside nav.accordion-content .w-richtext or all content in nav
    let contentCell = '';
    const nav = item.querySelector('nav.accordion-content');
    if (nav) {
      const rich = nav.querySelector('.w-richtext');
      if (rich) {
        contentCell = rich;
      } else {
        // fallback: all content inside nav
        contentCell = document.createElement('div');
        Array.from(nav.childNodes).forEach((node) => {
          contentCell.appendChild(node.cloneNode(true));
        });
      }
    }

    rows.push([titleCell, contentCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

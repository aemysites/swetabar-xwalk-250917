/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as per block spec
  const headerRow = ['Cards (cards3)'];

  // Get all direct card divs (each card is a direct child)
  const cardDivs = element.querySelectorAll(':scope > div');

  // Build table rows for each card
  const rows = Array.from(cardDivs).map((cardDiv) => {
    // Find the icon/image element (first .icon img inside)
    const iconDiv = cardDiv.querySelector('.icon');
    let imageOrIcon = null;
    if (iconDiv) {
      // Use the icon div itself as the cell content (includes svg/img)
      imageOrIcon = iconDiv;
    } else {
      // Fallback: look for first img
      const img = cardDiv.querySelector('img');
      if (img) imageOrIcon = img;
    }
    // Find the text content (first <p> inside)
    const textContent = cardDiv.querySelector('p');
    // Defensive: if no icon or text, cell must still be present
    return [imageOrIcon || '', textContent || ''];
  });

  // Compose the table cells array
  const cells = [headerRow, ...rows];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}

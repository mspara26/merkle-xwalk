import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  const socialMediaLinks = footer.querySelectorAll('.section:first-of-type ul li');
  socialMediaLinks.forEach((li) => {
    const icon = li.querySelector('a > span > img');
    const title = icon.getAttribute('data-icon-name');
    const link = li.querySelector('a');
    link.title = title;
  });

  block.append(footer);
}

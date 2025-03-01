import { createOptimizedPicture } from '../../scripts/aem.js';
import { renderClipPathCards } from './clip-path.js';
import { renderPercentCards } from './percentage.js';
import { renderArticlesCards } from './articles.js';

export default async function decorate(block) {
  const isClipPath = block.classList.contains('clip-path');
  const isPercent = block.classList.contains('percent');
  const isArticles = block.classList.contains('articles');

  if (isClipPath) {
    renderClipPathCards(block);
  }
  if (isPercent) {
    renderPercentCards(block);
  }
  if (isArticles) {
    renderArticlesCards(block);
  }

  if (!isClipPath && !isPercent) {
    /* change to ul, li */
    const ul = document.createElement('ul');
    [...block.children].forEach((row) => {
      const li = document.createElement('li');
      while (row.firstElementChild) li.append(row.firstElementChild);
      [...li.children].forEach((div) => {
        if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
        else div.className = 'cards-card-body';
      });
      ul.append(li);
    });
    ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
    block.textContent = '';
    block.append(ul);
  }
}

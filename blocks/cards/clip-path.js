import { createOptimizedPicture } from '../../scripts/aem.js';

export function renderClipPathCards(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    
    while (row.firstElementChild) a.append(row.firstElementChild);
    
    [...a.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'cards-card-image';
      } else if (div.children.length === 1 && div.querySelector('span')) {
        div.className = 'cards-card-icon';
      } else {
        div.className = 'cards-card-body';
      }
    });

    const link = a.querySelector('a');
    link.parentElement.remove();
    a.href = link.href;
  
    li.append(a);
    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '450' }])));

  block.textContent = '';
  block.append(ul);
}

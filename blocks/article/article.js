/**
 * loads and decorates the article block
 * @param {Element} block The article block element
 */

export default async function decorate(block) {
  const body = document.querySelector('body');
  body.classList.add('not-homepage');

  const firstChild = block.children[0];
  firstChild.className = 'article-content-wrapper';

  const sidebar = document.createElement('div');
  sidebar.className = 'sidebar';
  sidebar.innerHTML = `
    <h3>RELATED ARTICLES</h3>
    <a class="sidebar-link" href="/">Article 1</a>
    <a class="sidebar-link" href="/">Article 2</a>
  `;
  block.append(sidebar);
}
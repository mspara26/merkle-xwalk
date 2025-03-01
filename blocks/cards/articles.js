import { createOptimizedPicture } from '../../scripts/aem.js';

export async function renderArticlesCards(block) {
  const link = block.querySelector('a');

  async function fetchJson(link) {
    const response = await fetch(link?.href);

    if (response.ok) {
      const jsonData = await response.json();
      const data = jsonData?.data;
      return data;
    }
    return 'an error occurred';
  }

  function convertExcelDate(excelDate) {
    // Excel's base date is January 1, 1900, but Excel incorrectly treats 1900 as a leap year
    const baseDate = new Date(1900, 0, 1); // January 1, 1900
    baseDate.setDate(baseDate.getDate() + excelDate - 2); // Adjust for the leap year bug
  
    // Format the date as 'Feb 26, 2025'
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return baseDate.toLocaleDateString('en-US', options);
  }
  

  // fetch JSON
  const cardData = await fetchJson(link);

  // create elements
  const ul = document.createElement('ul');
  cardData.forEach((item) => {
    const excelDate = Number(item['published-date']);
    const formattedDate = convertExcelDate(excelDate);

    const picture = createOptimizedPicture(item.image, item.title, false, [{ width: 320 }]);
    picture.lastElementChild.width = '320';
    picture.lastElementChild.height = '180';
    const createdCard = document.createElement('li');
    createdCard.innerHTML = `
      <a href="${item.url}" aria-label="${item.title}" title="${item.title}">
        <div class="cards-card-image">
          <div data-align="center">${picture.outerHTML}</div>
        </div>
        <div class="cards-card-body">
          <h6>${item.subtitle}</h6>
          <h5>${item.title}</h5>
          <p>${item.description}</p>
          <div class="published-date">
            Article | ${formattedDate}
          </div>
        </div>
      </a>
    `;
    ul.append(createdCard);
  });

  block.textContent = '';
  block.append(ul);
}
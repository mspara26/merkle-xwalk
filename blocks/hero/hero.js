import { makeVideo } from '../../scripts/scripts.js';
import { decorateIcons } from '../../scripts/aem.js';

export default async function decorate(block) {
  decorateIcons(block);

  if (Object.values(block.classList).includes('video')) {
    const videoSrc = block.querySelector('div > a');

    if (videoSrc.href.includes(window.hlx.codeBasePath)) {
      videoSrc.href = videoSrc.text;
    }

    makeVideo(block.querySelector('div'), videoSrc.href);
    videoSrc.remove();
  }

  const imagesWrapper = block.querySelector('div:first-of-type');
  imagesWrapper.classList.add('images-wrapper');

  const contentWrapper = block.querySelector('div:nth-child(2)');
  contentWrapper.classList.add('content-wrapper');

  const buttonContainers = contentWrapper.querySelectorAll('.button-container');

  block.querySelectorAll('picture > img').forEach((img) => img.loading = 'eager');

  if (buttonContainers.length) {
    const buttonsWrapper = document.createElement('div');
    buttonsWrapper.classList.add('buttons');
    buttonContainers.forEach((btn) => buttonsWrapper.appendChild(btn));
    contentWrapper.appendChild(buttonsWrapper);
  }
}

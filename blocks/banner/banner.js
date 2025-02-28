export default function decorate(block) {
  // setup image banner
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div').parentElement;
        picWrapper.classList.add('banner-cards');
      }
    });
  });
}
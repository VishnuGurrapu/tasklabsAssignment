chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'downloadImages') {
    const images = [...document.querySelectorAll('img')].map(img => img.src);

    images.forEach((src, index) => {
      const a = document.createElement('a');
      a.href = src;
      a.download = `image-${index + 1}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
  }
});

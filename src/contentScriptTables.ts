chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'downloadTables') {
    const tables = document.querySelectorAll('table');

    tables.forEach((table, index) => {
      const blob = new Blob([table.outerHTML], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `table-${index + 1}.html`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
  }
});

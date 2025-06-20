import * as XLSX from 'xlsx';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'downloadTables') {
    const tables = document.querySelectorAll('table');

    tables.forEach((table, index) => {
      const worksheet = XLSX.utils.table_to_sheet(table);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, `Table${index + 1}`);

      const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

      const blob = new Blob([wbout], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `table-${index + 1}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      URL.revokeObjectURL(url);
    });
  }
});

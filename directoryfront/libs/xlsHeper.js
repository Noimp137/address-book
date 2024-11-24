import * as XLSX from './xlsx.full.min.js';

/**
 * Export data to an Excel file.
 * @param {Array} data - The data to export (array of objects).
 * @param {string} fileName - The name of the file to export.
 */
export function exportToExcel(data, fileName = 'export.xlsx') {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  XLSX.writeFile(workbook, fileName);
}

/**
 * Import data from an Excel file.
 * @param {File} file - The Excel file to import.
 * @returns {Promise<Array>} - A promise that resolves with the imported data.
 */
export function importFromExcel(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        resolve(jsonData);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
}

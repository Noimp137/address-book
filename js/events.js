import * as XLSX from 'xlsx';

document.getElementById('exportExcel').addEventListener('click', () => {
  const worksheet = XLSX.utils.json_to_sheet(contacts);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Contacts');
  XLSX.writeFile(workbook, 'contacts.xlsx');
});

document.getElementById('importExcel').addEventListener('change', (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    contacts = XLSX.utils.sheet_to_json(sheet);
    renderContacts();
  };
  reader.readAsArrayBuffer(file);
});

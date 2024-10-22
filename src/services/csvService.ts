import { createObjectCsvWriter } from 'csv-writer';

export function exportToCSV(data: any[]) {
  const csvRows = [];
  const headers = Object.keys(data[0]);
  csvRows.push(headers.join(','));
  
  for (const row of data) {
    csvRows.push(headers.map(header => JSON.stringify(row[header])).join(','));
  }
  
  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('download', 'data.csv');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function formatDate(dateStr: string) {
  const [day, month, year] = dateStr.split('/');
  return `${day}-${month}-${year}`;
}

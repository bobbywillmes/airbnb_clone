export function formatDate(date = new Date()) {
  let newDate = new Date(
    new Date(date).getFullYear(),
    new Date(date).getMonth(),
    new Date(date).getDate()
  );
  newDate = new Date(newDate.getTime() + 1000 * 60 * 60 * 24)
  newDate = newDate.toLocaleDateString();
  return newDate
}

export function formatDateTime(date = new Date()) {
  let newDate = new Date(
    new Date(date).getFullYear(),
    new Date(date).getMonth(),
    new Date(date).getDate(),
    new Date(date).getHours(),
    new Date(date).getMinutes(),
    new Date(date).getSeconds()
  );
  const options = {
    dateStyle: 'full',
    timeStyle: 'long'
  }
  newDate = newDate.toLocaleString('en-us', options);
  return newDate
}
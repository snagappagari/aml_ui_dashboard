export function formatDate(d: any) {
  let date = new Date(d);
  let day = ("0" + date.getDate()).slice(-2);
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let year = date.getFullYear();
  let hours = ("0" + date.getHours()).slice(-2);
  let minutes = ("0" + date.getMinutes()).slice(-2);

  // Check if the time is 5:30
  if (hours === "05" && minutes === "30") {
    return `${day}-${month}-${year}`; // Return only the date
  } else {
    return `${day}-${month}-${year} ${hours}:${minutes}`; // Return date and time
  }
}

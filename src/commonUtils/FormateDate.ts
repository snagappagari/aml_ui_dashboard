// export function formatDate(d: any) {
//   let date = new Date(d);
//   let day = ("0" + date.getDate()).slice(-2);
//   let month = ("0" + (date.getMonth() + 1)).slice(-2);
//   let year = date.getFullYear();
//   let hours = ("0" + date.getHours()).slice(-2);
//   let minutes = ("0" + date.getMinutes()).slice(-2);

//   // Check if the time is 5:30
//   if (hours === "00" && minutes === "00") {
//     return `${day}-${month}-${year}`; // Return only the date
//   } else {
//     return `${day}-${month}-${year} ${hours}:${minutes}`; // Return date and time
//   }
// }

export function formatDate(d: string) {
  try {
    // If `d` is not provided or invalid, use the current date-time
    let fixedDate = d ? d.split(".")[0] + "Z" : new Date().toISOString();
    console.log(fixedDate)

    let date = new Date(fixedDate);
    console.log(isNaN(date.getTime()))
    // If parsing fails, fallback to current date
    if (isNaN(date.getTime())) {
      console.error("Invalid date input:", d);
      date = new Date();
      // Use current date-time
    }

    let day = ("0" + date.getDate()).slice(-2);
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let year = date.getFullYear();
    let hours = ("0" + date.getHours()).slice(-2);
    let minutes = ("0" + date.getMinutes()).slice(-2);

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    let now = new Date();
    return `${("0" + now.getDate()).slice(-2)}-${("0" + (now.getMonth() + 1)).slice(-2)}-${now.getFullYear()} ${("0" + now.getHours()).slice(-2)}:${("0" + now.getMinutes()).slice(-2)}`;
  }
}

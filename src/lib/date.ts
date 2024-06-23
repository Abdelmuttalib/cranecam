export function formatDateShort(inputDate: string) {
  // const inputDate = "2024-05-27";
  const date = new Date(inputDate);

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[monthIndex];

  const formattedDate = `${day} ${month}, ${year}`;

  // Output: "27 May 2024"

  return formattedDate;
}

export function getDateMonth(inputDate: string) {
  // const inputDate = "2024-05-27";
  const date = new Date(inputDate);

  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[monthIndex];

  const formattedDate = `${month}, ${year}`;

  // Output: "27 May 2024"

  return formattedDate;
}

// format full date with time, no seconds
export function formatDate(date: string){
  const dateObj = new Date(date);
  // const options = {
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  //   hour: "numeric",
  //   minute: "numeric",
  // };

  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}

// export function formatDateShortWithoutYear(date: string) {
//   const dateObj = new Date(date);

//   return dateObj.toLocaleDateString("en-US", {
//     day: "numeric",
//     month: "short",
//   });
// }

export function formatDateShortWithoutYear(date: string) {
  const dateObj = new Date(date);

  // Get the month abbreviation (e.g., "Sep")
  const month = dateObj.toLocaleDateString("en-US", {
    month: "long",
  });

  // Get the day of the month (e.g., "13")
  const day = dateObj.getDate();

  // Combine the month abbreviation and day
  return `${day} ${month}`;
}
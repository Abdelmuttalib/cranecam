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

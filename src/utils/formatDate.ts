export function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  const daySuffix = getDaySuffix(day);

  return `${day}${daySuffix} ${month} ${year}`;
}

function getDaySuffix(day: number): string {
  if (day >= 11 && day <= 13) return "th"; // Handle 11th, 12th, 13th
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

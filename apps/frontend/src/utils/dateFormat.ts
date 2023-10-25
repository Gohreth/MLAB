export default function dateFormat(possibleDate: string | Date | undefined) {
  try {
    if (!possibleDate) throw new Error("Not a date");
    const date = new Date(possibleDate).toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    return date;
  } catch (error) {
    return "Unknown date";
  }
}

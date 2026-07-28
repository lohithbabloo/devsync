export function formatDate(value) {
  if (!value) return "";

  try {
    return new Date(value).toLocaleString();
  } catch (error) {
    return value;
  }
}

export function formatRelativeTime(value) {
  if (!value) return "";

  try {
    const date = new Date(value);
    const seconds = Math.round((date.getTime() - Date.now()) / 1000);
    const divisions = [
      { amount: 60, unit: "second" },
      { amount: 60, unit: "minute" },
      { amount: 24, unit: "hour" },
      { amount: 7, unit: "day" },
      { amount: 4.34524, unit: "week" },
      { amount: 12, unit: "month" },
      { amount: Number.POSITIVE_INFINITY, unit: "year" },
    ];
    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

    let duration = seconds;
    for (const division of divisions) {
      if (Math.abs(duration) < division.amount) {
        return rtf.format(Math.round(duration), division.unit);
      }
      duration /= division.amount;
    }
    return "";
  } catch (error) {
    return "";
  }
}

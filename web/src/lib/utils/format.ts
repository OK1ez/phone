const formatter = new Intl.RelativeTimeFormat(undefined, {
  numeric: "auto",
});

export function formatDate(timestamp: number): string {
  const now = Date.now();
  const date = new Date(timestamp);
  const diffInSeconds = (timestamp - now) / 1000;

  const absDiff = Math.abs(diffInSeconds);

  if (absDiff < 60) {
    return "just now";
  }

  if (absDiff < 3600) {
    const minutes = Math.round(diffInSeconds / 60);
    return formatter.format(minutes, "minute");
  }

  if (absDiff < 86400) {
    const hours = Math.round(diffInSeconds / 3600);
    return formatter.format(hours, "hour");
  }

  if (absDiff < 604800) {
    const days = Math.round(diffInSeconds / 86400);
    return formatter.format(days, "day");
  }

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);

  return `${day}.${month}.${year}`;
}

export function formatCurrency(amount: number) {
  const formatted = new Intl.NumberFormat("nb-NO", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
  return `${formatted} kr`;
}

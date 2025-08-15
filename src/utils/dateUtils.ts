export function toDateString(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function parseDateString(dateString: string): Date {
  return new Date(dateString);
}
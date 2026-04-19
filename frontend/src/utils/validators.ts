export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateDateRange(start: Date, end: Date): boolean {
  return start <= end;
}

export function isNotEmpty(value: string): boolean {
  return value.trim().length > 0;
}

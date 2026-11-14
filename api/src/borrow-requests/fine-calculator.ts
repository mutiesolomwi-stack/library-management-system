export function calculateFine(
  dueDate: Date | string,
  returnDate: Date | string,
  ratePerDay = 10
): number {
  if (!dueDate || !returnDate) return 0;
  const due = new Date(dueDate).getTime();
  const ret = new Date(returnDate).getTime();
  
  if (isNaN(due) || isNaN(ret)) return 0;
  
  const diffTime = ret - due;
  const daysLate = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  return daysLate * ratePerDay;
}

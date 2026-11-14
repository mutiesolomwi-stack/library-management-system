import { calculateFine } from './fine-calculator';

describe('calculateFine', () => {
  it('returns 0 when returned on time or early', () => {
    const due = new Date('2026-01-10');
    const returned = new Date('2026-01-10');
    expect(calculateFine(due, returned)).toBe(0);

    const early = new Date('2026-01-08');
    expect(calculateFine(due, early)).toBe(0);
  });

  it('charges expected rate per day for late returns', () => {
    const due = new Date('2026-01-10');
    const returned = new Date('2026-01-13');
    expect(calculateFine(due, returned, 10)).toBe(30);
  });

  it('handles string dates correctly', () => {
    expect(calculateFine('2026-01-10', '2026-01-15', 5)).toBe(25);
  });
});

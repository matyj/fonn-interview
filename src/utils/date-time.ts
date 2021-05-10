import { isAfter, isBefore, addDays } from 'date-fns';
import { InvalidDateError } from '../errors';
import { DateValidator } from './date-format-validator';

export class DateTime {
  private date: Date;

  constructor(date: string) {
    if (!DateValidator.isISO(date)) {
      throw new InvalidDateError('Date is not in ISO format');
    }
    this.date = new Date(date);
  }

  isAfter(date: DateTime): boolean {
    return isAfter(this.date, date.toDate());
  }

  isBetween(dateFrom: DateTime, dateTo: DateTime) {
    return isAfter(this.date, dateFrom.toDate()) && isBefore(this.date, dateTo.toDate());
  }

  addDays(days: number) {
    return new DateTime(addDays(this.date, days).toISOString());
  }

  toDate() {
    return this.date;
  }

  toString() {
    return this.date.toISOString();
  }
}

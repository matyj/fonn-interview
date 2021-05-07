import * as moment from 'moment';

export class DateTime {
  private instance;

  constructor(date: string) {
    this.instance = moment(date);
  }

  isAfter(date: string): boolean {
    return this.instance.isAfter(moment(date));
  }

  addDays(days: number) {
    return new DateTime(this.instance.add(days, 'day').toISOString());
  }

  toString() {
    return this.instance.toISOString();
  }
}

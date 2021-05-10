import { DateTime } from '../../utils/date-time';

export class Event {
  constructor(readonly id: string, readonly title: string, readonly startDate: DateTime, readonly endDate: DateTime) {}

  toSnapshot() {
    return {
      id: this.id,
      title: this.title,
      startDate: this.startDate.toString(),
      endDate: this.endDate.toString(),
    };
  }
}

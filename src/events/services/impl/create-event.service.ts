import { BusinessError } from '../../../errors/business.error';
import { Event } from '../../../events/models/event';
import { EventsRepo } from '../../../events/repos/events.repo';
import { DateRangeValidator } from '../../../events/validators/date-range.validator';
import { DateTime } from '../../../utils/date-time';
import { uniqueId } from '../../../utils/unique-id.generator';

export class CreateEventService {
  constructor(private eventsRepo: EventsRepo) {}

  async execute(dateFrom: DateTime, dateTo: DateTime, title: string) {
    await this.validateParams(dateFrom, dateTo);

    const newEvent = new Event(uniqueId(), title, dateFrom, dateTo);
    this.eventsRepo.save(newEvent);

    return Promise.resolve(newEvent);
  }

  private async validateParams(dateFrom: DateTime, dateTo: DateTime) {
    DateRangeValidator.validate(dateFrom, dateTo);

    (await this.eventsRepo.getAll()).forEach((item) => {
      if (item.startDate.isBetween(dateFrom, dateTo)) {
        throw new BusinessError('The new events date is conflicting with the already saved event');
      }
    });
  }
}

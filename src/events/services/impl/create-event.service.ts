import * as _ from 'lodash';
import { BusinessError } from '../../../errors/business.error';
import { Event } from '../../../events/models/event';
import { EventsRepo } from '../../../events/repos/events.repo';
import { DateRangeValidator } from '../../../events/validators/date-range.validator';
import { DateTime } from '../../../utils/date-time';
import { uniqueId } from '../../../utils/unique-id.generator';

export class CreateEventService {
  constructor(private eventsRepo: EventsRepo) {}

  execute(dateFrom: DateTime, dateTo: DateTime, title: string) {
    this.validateParams(dateFrom, dateTo);

    const newEvent = new Event(uniqueId(), title, dateFrom, dateTo);
    this.eventsRepo.save(newEvent);

    return Promise.resolve(newEvent);
  }

  private validateParams(dateFrom: DateTime, dateTo: DateTime) {
    DateRangeValidator.validate(dateFrom, dateTo);

    const lastEvent = _(this.eventsRepo.getAll())
      .sortBy((item) => new Date(item.endDate))
      .last();

    if (lastEvent.startDate.isAfter(dateFrom)) {
      throw new BusinessError('Date from is younger then the last events end date');
    }
  }
}

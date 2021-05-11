import { EventsRepo } from '../../../events/repos/events.repo';
import { DateRangeValidator } from '../../../events/validators/date-range.validator';
import { DateTime } from '../../../utils/date-time';

export class GetEventsService {
  constructor(private eventsRepo: EventsRepo) {}

  async execute(dateFrom: DateTime, dateTo: DateTime, offset: number, limit: number) {
    DateRangeValidator.validate(dateFrom, dateTo);

    const events = (await this.eventsRepo.getAll())
      .filter((item) => item.startDate.isBetween(dateFrom, dateTo))
      .slice(offset, offset + limit);

    return Promise.resolve({ events, totalCount: events.length });
  }
}

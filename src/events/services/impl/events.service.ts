import { EventsService } from '../events.service';
import { Event } from '../../models/event';
import { DateTime } from '../../../utils/date-time';
import { GetEventsService } from './get-events.service';
import { CreateEventService } from './create-event.service';
import { EventsRepo } from '../../../events/repos/events.repo';

export class EventsMockService implements EventsService {
  constructor(
    private getEventsService: GetEventsService,
    private createEventService: CreateEventService,
    private eventsRepo: EventsRepo,
  ) {}

  createEvent(dateFrom: string, dateTo: string, title: string): Promise<Event> {
    return this.createEventService.execute(new DateTime(dateFrom), new DateTime(dateTo), title);
  }

  getEvent(id: string): Promise<Event> {
    return this.eventsRepo.getOne(id);
  }

  getEvents(
    dateFrom: string,
    dateTo: string,
    offset: number,
    limit: number,
  ): Promise<{ totalCount: number; events: Event[] }> {
    return this.getEventsService.execute(new DateTime(dateFrom), new DateTime(dateTo), offset, limit);
  }

  removeEvent(id: string): Promise<void> {
    return this.eventsRepo.remove(id);
  }
}

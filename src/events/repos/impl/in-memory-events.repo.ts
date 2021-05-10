import { EventNotFoundError } from '../../../events/errors/event-not-found.error';
import { EventsMockData } from '../../../events/mock-data/event';
import { Event } from '../../../events/models/event';
import { DateTime } from '../../../utils/date-time';
import { EventsRepo } from '../events.repo';

export class InMemoryEventsRepo implements EventsRepo {
  private items: Event[] = [
    ...EventsMockData.map(
      (item) => new Event(item.id, item.title, new DateTime(item.startDate), new DateTime(item.endDate)),
    ),
  ];

  getOne(id: string) {
    const item = this.items.find((item) => item.id === id);

    if (!item) {
      throw new EventNotFoundError();
    }

    return item;
  }

  remove(id: string) {
    const indexOfEventToRemove = this.items.findIndex((item) => item.id === id);

    if (indexOfEventToRemove === -1) {
      throw new EventNotFoundError();
    }

    this.items.splice(indexOfEventToRemove, 1);
    return Promise.resolve();
  }

  save(event: Event) {
    this.items.push(event);
  }

  getAll() {
    return this.items;
  }
}

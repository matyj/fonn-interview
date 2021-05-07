import * as _ from 'lodash';
import { EventsService } from '../events.service';
import { Event } from '../../models/event';
import { BusinessError } from '../../../errors/business.error';
import { DateTime } from '../../../utils/date-time';
import { EventNotFoundError } from '../../errors/event-not-found.error';
import { DateRangeValidator } from '../../validators/date-range.validator';

/* eslint-disable */
export class EventsMockService implements EventsService {
  constructor(private _events: Event[]) {}

  createEvent(dateFrom: string, dateTo: string, title: string): Promise<Event> {
    this.validateParams(dateFrom, dateTo);

    const newEvent = { id: 'id', startDate: dateFrom, endDate: dateTo, title };
    this._events.push(newEvent);

    return Promise.resolve(newEvent);
  }

  private validateParams(dateFrom: string, dateTo: string) {
    DateRangeValidator.validate(dateFrom, dateTo);

    const lastEvent = _(this._events)
      .sortBy((item) => new Date(item.endDate))
      .last();

    if (new DateTime(lastEvent.startDate).isAfter(dateFrom)) {
      throw new BusinessError('Date from is younger then the last events end date');
    }
  }

  getEvent(id: string): Promise<Event> {
    const event = this._events.find((item) => item.id === id);

    if (!event) {
      throw new EventNotFoundError();
    }
    return Promise.resolve(this._events.find((item) => item.id === id));
  }

  getEvents(
    dateFrom: string,
    dateTo: string,
    offset: number,
    limit: number,
  ): Promise<{ totalCount: number; events: Event[] }> {
    DateRangeValidator.validate(dateFrom, dateTo);

    const events = this._events
      .filter((item) => new DateTime(item.startDate).isBetween(dateFrom, dateTo))
      .slice(offset, offset + limit);

    return Promise.resolve({ events, totalCount: events.length });
  }

  removeEvent(id: string): Promise<void> {
    // @ts-ignore
    return Promise.resolve({}); // todo: implement method
  }
}

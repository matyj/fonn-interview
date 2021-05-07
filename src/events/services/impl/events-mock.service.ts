import * as _ from 'lodash';
import { EventsService } from '../events.service';
import { Event } from '../../models/event';
import { DateValidator } from '../../../utils/DateFormatValidator';
import { BusinessError } from '../../../errors/BusinessError';
import { DateTime } from '../../../utils/DateTime';

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
    if (!DateValidator.isISO(dateFrom)) {
      throw new BusinessError('Date from is not in ISO format');
    }

    if (!DateValidator.isISO(dateTo)) {
      throw new BusinessError('Date to is not in ISO format');
    }

    if (new DateTime(dateFrom).isAfter(dateTo)) {
      throw new BusinessError('Date to cannot be younger than date from');
    }

    const lastEvent = _(this._events)
      .sortBy((item) => new Date(item.endDate))
      .last();

    if (new DateTime(lastEvent.startDate).isAfter(dateFrom)) {
      throw new BusinessError('Date from is younger then the last events end date');
    }
  }

  getEvent(id: string): Promise<Event> {
    // @ts-ignore
    return Promise.resolve(this._events.find((event) => event.id === id)); // todo: implement method
  }

  getEvents(
    dateFrom: string,
    dateTo: string,
    offset: number,
    limit: number,
  ): Promise<{ totalCount: number; events: Event[] }> {
    // @ts-ignore
    return Promise.resolve({}); // todo: implement method
  }

  removeEvent(id: string): Promise<void> {
    // @ts-ignore
    return Promise.resolve({}); // todo: implement method
  }
}

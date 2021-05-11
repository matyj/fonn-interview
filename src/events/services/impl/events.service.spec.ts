import * as _ from 'lodash';
import { EventsService } from '../events.service';
import { EventsMockService } from './events.service';
import { EventsMockData } from '../../mock-data/event';
import { InvalidDateError } from '../../../errors';
import { DateTime } from '../../../utils/date-time';
import { EventNotFoundError } from '../../errors/event-not-found.error';
import { CreateEventService } from './create-event.service';
import { InMemoryEventsRepo } from '../../../events/repos/impl/in-memory-events.repo';
import { GetEventsService } from './get-events.service';
import { EventsRepo } from './../../repos/events.repo';

describe('EventsMockService', () => {
  let eventsService: EventsService;

  let eventsRepo: EventsRepo;

  beforeEach(() => {
    eventsRepo = new InMemoryEventsRepo();

    eventsService = new EventsMockService(
      new GetEventsService(eventsRepo),
      new CreateEventService(eventsRepo),
      eventsRepo,
    );
  });

  describe('createEvent()', () => {
    it('is defined of type function', () => {
      expect(eventsService.createEvent).toBeDefined();
      expect(typeof eventsService.createEvent).toBe('function');
    });

    it('should add an event', async () => {
      const lastEvent = getLastEvent();

      const event = await eventsService.createEvent(
        new DateTime(lastEvent.startDate).addDays(1).toString(),
        new DateTime(lastEvent.startDate).addDays(1).toString(),
        'The Event',
      );

      const createdEvent = await eventsService.getEvent(event.id);

      expect(createdEvent.id).toBeDefined();
    });

    it('should add an when the previous ones date is the same', async () => {
      const lastEvent = getLastEvent();

      const event = await eventsService.createEvent(
        lastEvent.startDate,
        new DateTime(lastEvent.startDate).addDays(1).toString(),
        'The Event',
      );

      const createdEvent = await eventsService.getEvent(event.id);

      expect(createdEvent.id).toBeDefined();
    });

    it('should throw when the previous ones date is older then the new start date', async () => {
      const lastEvent = getLastEvent();

      await expect(async () => {
        eventsService.createEvent(
          new DateTime(lastEvent.startDate).addDays(-1).toString(),
          new DateTime(lastEvent.startDate).addDays(1).toString(),
          'The Event',
        );
      }).rejects.toThrowError(new InvalidDateError('Date from is younger then the last events end date'));
    });

    it('should throw error if date from is not iso', async () => {
      await expect(async () => {
        eventsService.createEvent('2021-05-kk', '2021-05-06', 'The Event');
      }).rejects.toThrowError(new InvalidDateError('Date is not in ISO format'));
    });

    it('should throw error if date to is not iso', async () => {
      await expect(async () => {
        eventsService.createEvent('2021-05-05', '2021-05-hh', 'The Event');
      }).rejects.toThrowError(new InvalidDateError('Date is not in ISO format'));
    });

    it('should throw error if date to is younger then date from', async () => {
      await expect(async () => {
        eventsService.createEvent('2020-01-06T14:00:00.000Z', '2020-01-05T14:00:00.000Z', 'The Event');
      }).rejects.toThrowError(new InvalidDateError('Date to cannot be younger than date from'));
    });
  });

  describe('getEvent()', () => {
    it('is defined of type function', () => {
      expect(eventsService.getEvent).toBeDefined();
      expect(typeof eventsService.getEvent).toBe('function');
    });

    it('should get existing event', async () => {
      const randomEvent = _.sample(EventsMockData);

      const result = await eventsService.getEvent(randomEvent.id);

      expect(result.id).toEqual(randomEvent.id);
    });

    it('should throw error if event does not exist', async () => {
      await expect(async () => {
        eventsService.getEvent('some random id');
      }).rejects.toThrowError(EventNotFoundError);
    });
  });

  describe('getEvents()', () => {
    it('is defined of type function', () => {
      expect(eventsService.getEvents).toBeDefined();
      expect(typeof eventsService.getEvents).toBe('function');
    });

    it('should get events for given date range', async () => {
      const dateFrom = '2020-01-05T14:00:00.000Z';
      const dateTo = '2020-01-06T14:00:00.000Z';

      const expectedResult = eventsRepo
        .getAll()
        .filter((item) => item.startDate.isBetween(new DateTime(dateFrom), new DateTime(dateTo)));

      const { events } = await eventsService.getEvents(dateFrom, dateTo, 0, 10);

      expect(events).toEqual(expectedResult);
    });

    it('should get events with the given offset', async () => {
      const dateFrom = '2020-01-05T00:00:00.000Z';
      const dateTo = '2020-05-06T23:59:59.999Z';

      const offset = 10;

      const limit = 20;

      const itemsFromRange = eventsRepo
        .getAll()
        .filter((item) => item.startDate.isBetween(new DateTime(dateFrom), new DateTime(dateTo)));

      expect(itemsFromRange.length).toBeGreaterThan(offset + limit);

      const expectedResult = itemsFromRange.slice(offset, offset + limit);

      const { events } = await eventsService.getEvents(dateFrom, dateTo, offset, limit);

      expect(events).toEqual(expectedResult);
    });

    it('should throw error if date from is not iso', async () => {
      await expect(async () => {
        eventsService.getEvents('2021-05-kk', '2021-05-06', 0, 0);
      }).rejects.toThrowError(new InvalidDateError('Date is not in ISO format'));
    });

    it('should throw error if date to is not iso', async () => {
      await expect(async () => {
        eventsService.getEvents('2021-05-05', '2021-05-hh', 0, 0);
      }).rejects.toThrowError(new InvalidDateError('Date is not in ISO format'));
    });
  });

  describe('removeEvent()', () => {
    it('is defined of type function', () => {
      expect(eventsService.removeEvent).toBeDefined();
      expect(typeof eventsService.removeEvent).toBe('function');
    });

    it('should remove event', async () => {
      const randomItem = _.sample(EventsMockData);
      await eventsService.removeEvent(randomItem.id);

      await expect(async () => {
        eventsService.getEvent(randomItem.id);
      }).rejects.toThrowError(EventNotFoundError);
    });

    it('should throw error if item does not exist', async () => {
      await expect(async () => {
        eventsService.removeEvent('some not existing id');
      }).rejects.toThrowError(EventNotFoundError);
    });
  });

  const getLastEvent = () =>
    _(EventsMockData)
      .sortBy((item) => new Date(item.endDate))
      .last();
});

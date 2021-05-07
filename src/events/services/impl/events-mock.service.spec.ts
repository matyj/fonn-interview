import * as _ from 'lodash';
import { EventsService } from '../events.service';
import { EventsMockService } from './events-mock.service';
import { EventsMockData } from '../../mock-data/event';
import { BusinessError } from '../../../errors/BusinessError';
import { DateTime } from '../../../utils/DateTime';

describe('EventsMockService', () => {
  let eventsService: EventsService;

  beforeEach(() => {
    eventsService = new EventsMockService([...EventsMockData]);
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
      }).rejects.toThrowError(new BusinessError('Date from is younger then the last events end date'));
    });

    it('should throw error if date from is not iso', async () => {
      await expect(async () => {
        eventsService.createEvent('2021-05-kk', '2021-05-06', 'The Event');
      }).rejects.toThrowError(new BusinessError('Date from is not in ISO format'));
    });

    it('should throw error if date to is not iso', async () => {
      await expect(async () => {
        eventsService.createEvent('2021-05-05', '2021-05-hh', 'The Event');
      }).rejects.toThrowError(new BusinessError('Date to is not in ISO format'));
    });

    it('should throw error if date to is younger then date from', async () => {
      await expect(async () => {
        eventsService.createEvent('2021-05-06', '2021-05-05', 'The Event');
      }).rejects.toThrowError(new BusinessError('Date to cannot be younger than date from'));
    });
  });

  describe('getEvent()', () => {
    it('is defined of type function', () => {
      expect(eventsService.getEvent).toBeDefined();
      expect(typeof eventsService.getEvent).toBe('function');
    });
  });

  describe('getEvents()', () => {
    it('is defined of type function', () => {
      expect(eventsService.getEvents).toBeDefined();
      expect(typeof eventsService.getEvents).toBe('function');
    });
  });

  describe('removeEvent()', () => {
    it('is defined of type function', () => {
      expect(eventsService.removeEvent).toBeDefined();
      expect(typeof eventsService.removeEvent).toBe('function');
    });
  });

  const getLastEvent = () =>
    _(EventsMockData)
      .sortBy((item) => new Date(item.endDate))
      .last();
});

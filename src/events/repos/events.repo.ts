import { Event } from '../models/event';

export interface EventsRepo {
  getAll(): Event[];
  getOne(id: string);
  remove(id: string);
  save(event: Event);
}

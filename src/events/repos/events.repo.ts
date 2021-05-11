import { Event } from '../models/event';

export interface EventsRepo {
  getAll(): Promise<Event[]>;
  getOne(id: string): Promise<Event>;
  remove(id: string): Promise<void>;
  save(event: Event): Promise<void>;
}

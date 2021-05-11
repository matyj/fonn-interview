import { DateTime } from './date-time';

describe('DateTime', () => {
  describe('isAfter', () => {
    it('should return true if the passed date is same', () => {
      const target = new DateTime('2020-10-10T14:00:00.000Z');
      expect(target.isAfter(new DateTime('2020-10-09T14:00:00.000Z'))).toBeTruthy();
    });

    it('should return false if the passed date is not after', () => {
      const target = new DateTime('2020-10-10T14:00:00.000Z');
      expect(target.isAfter(new DateTime('2020-10-11T14:00:00.000Z'))).toBeFalsy();
    });

    it('should return false if the passed date is same', () => {
      const target = new DateTime('2020-10-10T14:00:00.000Z');
      expect(target.isAfter(new DateTime('2020-10-10T14:00:00.000Z'))).toBeFalsy();
    });
  });

  describe('addDays', () => {
    it('should add days', () => {
      const target = new DateTime('2020-10-10T14:00:00.000Z');

      const result = target.addDays(1);

      expect(new Date(result.toString()).getDate()).toBe(11);
    });
  });

  describe('isBetween', () => {
    it('should return true if date is between', () => {
      const target = new DateTime('2020-10-10T14:00:00.000Z');
      expect(
        target.isBetween(new DateTime('2020-10-09T14:00:00.000Z'), new DateTime('2020-10-11T14:00:00.000Z')),
      ).toBeTruthy();
    });

    it('should return false if date is before', () => {
      const target = new DateTime('2020-10-08T14:00:00.000Z');
      expect(
        target.isBetween(new DateTime('2020-10-09T14:00:00.000Z'), new DateTime('2020-10-11T14:00:00.000Z')),
      ).toBeFalsy();
    });

    it('should return false if date is after', () => {
      const target = new DateTime('2020-10-12T14:00:00.000Z');
      expect(
        target.isBetween(new DateTime('2020-10-09T14:00:00.000Z'), new DateTime('2020-10-11T14:00:00.000Z')),
      ).toBeFalsy();
    });
  });
});

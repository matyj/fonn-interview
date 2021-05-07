import { DateTime } from './date-time';

describe('DateTime', () => {
  describe('isAfter', () => {
    it('should return true if the passed date is same', () => {
      const target = new DateTime('2020-10-10');
      expect(target.isAfter('2020-10-09')).toBeTruthy();
    });

    it('should return false if the passed date is not after', () => {
      const target = new DateTime('2020-10-10');
      expect(target.isAfter('2020-10-11')).toBeFalsy();
    });

    it('should return false if the passed date is same', () => {
      const target = new DateTime('2020-10-10');
      expect(target.isAfter('2020-10-10')).toBeFalsy();
    });
  });

  describe('addDays', () => {
    it('should add days', () => {
      const target = new DateTime('2020-10-10');

      const result = target.addDays(1);

      expect(new Date(result.toString()).getDate()).toBe(11);
    });
  });

  describe('isBetween', () => {
    it('should return true if date is between', () => {
      const target = new DateTime('2020-10-10');
      expect(target.isBetween('2020-10-09', '2020-10-11')).toBeTruthy();
    });

    it('should return false if date is before', () => {
      const target = new DateTime('2020-10-08');
      expect(target.isBetween('2020-10-09', '2020-10-11')).toBeFalsy();
    });

    it('should return false if date is after', () => {
      const target = new DateTime('2020-10-12');
      expect(target.isBetween('2020-10-09', '2020-10-11')).toBeFalsy();
    });
  });
});

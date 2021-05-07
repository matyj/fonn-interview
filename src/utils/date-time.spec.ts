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
});

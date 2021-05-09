import { DateValidator } from '../../utils/date-format-validator';
import { InvalidDateError, BadParamError } from '../../errors';
import { DateTime } from '../../utils/date-time';

export const DateRangeValidator = {
  validate(dateFrom: string, dateTo: string) {
    if (!DateValidator.isISO(dateFrom)) {
      throw new InvalidDateError('Date from is not in ISO format');
    }

    if (!DateValidator.isISO(dateTo)) {
      throw new InvalidDateError('Date to is not in ISO format');
    }

    if (new DateTime(dateFrom).isAfter(dateTo)) {
      throw new BadParamError('Date to cannot be younger than date from');
    }
  },
};

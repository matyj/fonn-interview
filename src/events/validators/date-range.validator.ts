import { BadParamError } from '../../errors';
import { DateTime } from '../../utils/date-time';

export const DateRangeValidator = {
  validate(dateFrom: DateTime, dateTo: DateTime) {
    if (dateFrom.isAfter(dateTo)) {
      throw new BadParamError('Date to cannot be younger than date from');
    }
  },
};

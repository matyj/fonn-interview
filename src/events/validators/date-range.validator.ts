import { DateValidator } from '../../utils/date-format-validator';
import { BusinessError } from '../../errors/business.error';
import { DateTime } from '../../utils/date-time';

export const DateRangeValidator = {
  validate(dateFrom: string, dateTo: string) {
    if (!DateValidator.isISO(dateFrom)) {
      throw new BusinessError('Date from is not in ISO format');
    }

    if (!DateValidator.isISO(dateTo)) {
      throw new BusinessError('Date to is not in ISO format');
    }

    if (new DateTime(dateFrom).isAfter(dateTo)) {
      throw new BusinessError('Date to cannot be younger than date from');
    }
  },
};

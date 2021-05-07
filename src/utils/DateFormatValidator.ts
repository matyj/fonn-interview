import * as moment from 'moment';

export const DateValidator = {
  isISO(date: string) {
    return moment(date, moment.ISO_8601, true).isValid();
  },
};

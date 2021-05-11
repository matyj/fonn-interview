import * as BaseJoi from '@hapi/joi';
import * as JoiExtensions from '@hapi/joi-date';

const Joi = BaseJoi.extend(JoiExtensions);

export const DateValidator = {
  isISO(date: string) {
    const { error } = Joi.date().format('YYYY-MM-DDTHH:mm:ss.sssZ').validate(date);
    return error ? false : true;
  },
};

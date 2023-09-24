import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import { HttpException } from '@exceptions/httpException';

export const ValidationMiddleware = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.validate(req.body);
    if (validation.error) {
      const message = validation.error.details.map(detail => detail.message).join(', ');
      next(new HttpException(400, message));
    } else {
      req.body = validation.value;
      next();
    }
  };
};

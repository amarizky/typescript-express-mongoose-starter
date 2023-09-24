import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/httpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import { UserModel } from '@models/users.model';

const getAuthorization = req => {
  const coockie = req.cookies['Authorization'];
  if (coockie) return coockie;

  const header = req.header('Authorization');
  if (header) return header.split('Bearer ')[1];

  return null;
};

export const AuthMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = getAuthorization(req);
    if (!Authorization) next(new HttpException(403, 'Authentication token is missing'));

    const { _id } = verify(Authorization, SECRET_KEY) as DataStoredInToken;
    const findUser = await UserModel.findById(_id);

    if (!findUser) next(new HttpException(401, 'Wrong authentication token'));

    req.user = findUser;
    next();
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

import { ConnectOptions } from 'mongoose';

import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME } from '@config';

export const dbConnection = {
  url: `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
  options: {
    autoIndex: true,
    user: DB_USERNAME,
    pass: DB_PASSWORD,
  } as ConnectOptions,
};

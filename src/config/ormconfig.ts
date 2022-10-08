import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

const ormconfig: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [
    __dirname + '/../db/entity/*.ts',
    __dirname + '/../db/entity/*.js',
  ],
  synchronize: true,
  logging: false,
};

export default ormconfig;

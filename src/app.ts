import * as express from 'express';
import * as dotenv from 'dotenv';
import usersRouter from './routes/users.route';
import authRouter from './routes/auth.route';

//추가됨//
import postsRouter from './routes/posts.router';

import 'reflect-metadata';
import { Database } from './db/index';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';

class Server {
  public app: express.Application;

  constructor() {
    const app: express.Application = express();
    this.app = app;
  }

  private setRoute() {
    this.app.use('/users', usersRouter);
    this.app.use('/auth', authRouter);

    //인국 작성 //
    this.app.use('/posts', postsRouter);
  }

  private setMiddleware() {
    //* dotenv
    dotenv.config({ path: `${__dirname}/../.env` });

    //* Database Connection
    const db = new Database();
    db.connectToDB();

    //* cookie parser
    this.app.use(cookieParser());

    //* cors
    this.app.use(
      cors({
        origin: process.env.URL,
        credentials: true,
      }),
    );

    //* logging middleware
    this.app.use((req, res, next) => {
      console.log(`✅ req has been arrived from : ${req.rawHeaders[1]}`);
      next();
    });

    //* json middleware
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.setRoute();
  }

  public listen() {
    this.setMiddleware();
    this.app.listen(process.env.PORT, () => {
      console.log(`✅ Server is on : ${process.env.URL}:${process.env.PORT}`);
    });
  }
}

function init() {
  const server = new Server();
  server.listen();
}

init();

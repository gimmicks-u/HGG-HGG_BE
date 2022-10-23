import * as express from 'express';
import * as dotenv from 'dotenv';
import usersRouter from './routes/users.route';
import authRouter from './routes/auth.route';

//추가됨//
import postsRouter from './routes/posts.router';
import * as passport from 'passport'; //npm i --save-dev @types/passport
import * as session from 'express-session'; //npm i --save-dev @types/express-session
import { Passport } from './middlewares/package/passport';

import 'reflect-metadata';
import { Database } from './db/index';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';

class Server {
  public app: express.Application;
  public passport = Passport;

  constructor() {
    const app: express.Application = express();
    this.app = app;
  }

  private setRoute() {
    //인국 작성//
    this.app.use(passport.initialize()); //passport 추가
    this.app.use(passport.session()); //passport 추가

    this.app.use('/auth', authRouter);
    this.app.use('/users', usersRouter);

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

    //인국 작성//
    this.app.use(
      session({
        secret: process.env.SECRET_SESSION,
        resave: false, //false
        saveUninitialized: true,
      }),
    );
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

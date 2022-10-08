import * as express from 'express';
import * as dotenv from 'dotenv';
import usersRouter from './routes/users.route';
import 'reflect-metadata';
import { Database } from './db/index';

class Server {
  public app: express.Application;

  constructor() {
    const app: express.Application = express();
    this.app = app;
  }

  private setRoute() {
    this.app.use('/users', usersRouter);
  }

  private setMiddleware() {
    //* dotenv
    dotenv.config({ path: `${__dirname}/../.env` });

    //* Database Connection
    const db = new Database();
    db.connectToDB();

    //* logging middleware
    this.app.use((req, res, next) => {
      console.log(`✅ req has been arrived from : ${req.rawHeaders[1]}`);
      next();
    });

    //* json middleware
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.setRoute();

    this.app.get('/', async (req, res) => {
      res.json('hi');
    });
  }

  public listen() {
    this.setMiddleware();
    this.app.listen(process.env.PORT, () => {
      console.log(`✅ Server is on : http://localhost:${process.env.PORT}`);
    });
  }
}

function init() {
  const server = new Server();
  server.listen();
}

init();

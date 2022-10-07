import * as express from 'express';
import * as dotenv from 'dotenv';
// import catsRouter from './cats/cats.route';

class Server {
  public app: express.Application;

  constructor() {
    const app: express.Application = express();
    this.app = app;
  }

  private setRoute() {
    // this.app.use(catsRouter);
  }

  private setMiddleware() {
    //* dotenv
    dotenv.config({ path: `${__dirname}/../.env` });

    //* logging middleware
    this.app.use((req, res, next) => {
      console.log('-----req 도착-----');
      console.log(` from : req.rawHeaders[1]`);
      next();
      const name = 'abc';
      console.log(name);
    });

    //* json middleware
    this.app.use(express.json());

    this.setRoute();

    this.app.get('/', (req, res) => {
      res.status(400).json('hi');
    });

    //* 404 middleware
    // this.app.use((req, res, next) => {
    //   console.log('this is error middleware');
    //   res.send({ error: '404 not found error' });
    // });
  }

  public listen() {
    this.setMiddleware();
    this.app.listen(process.env.PORT, () => {
      console.log(`Server is on : http://localhost:${process.env.PORT}`);
    });
  }
}

function init() {
  const server = new Server();
  server.listen();
}

init();

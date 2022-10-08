import { Connection, createConnection } from 'typeorm';
import connectionOption from '../config/ormconfig';

export class Database {
  public connection: Connection;

  constructor() {
    // this.connectToDB();
  }

  public connectToDB(): void {
    createConnection(connectionOption)
      .then((_con) => {
        this.connection = _con;
        console.log('✅ Connected to db!!');
      })
      .catch(console.error);
  }
}

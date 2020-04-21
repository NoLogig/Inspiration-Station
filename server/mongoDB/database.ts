import { MongoClient, Db } from 'mongodb';
import { IDatabaseConfig } from './interfaces/index';

export class Database {

  private db: Db;
  private mongoClient;
  private mongoURI = (dbConfig: IDatabaseConfig) => `mongodb://${dbConfig.dbuser}:${dbConfig.dbpassword}@${dbConfig.host}:${dbConfig.port}/${dbConfig.dbname}`;

  constructor() {  }

  public get getDB() { return this.db; }

  public connectToDatabase(dbConfig: IDatabaseConfig, next?: (database: Db) => any) {

    // Connect to the db
    MongoClient.connect(this.mongoURI(dbConfig), (err, mongo) => {

      if (!err) {
        this.mongoClient = mongo;
        if (next) return next(this.mongoClient.db(dbConfig.dbname));
      }

      console.error('Error while connecting to Database:');
      console.error(err);
      return // next(err);
    });

  }

}

let database = new Database();
export default database;

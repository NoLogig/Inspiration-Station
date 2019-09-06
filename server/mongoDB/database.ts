// import { MongoClient, Db } from 'mongodb';
// import { IDatabaseConfig } from './interfaces/index';

// export class Database {

//   private db: Db;

  
//   private mongoClient;

//   private mongoURI = (dbConfig: IDatabaseConfig) => {
//     return `mongodb://${dbConfig.dbuser}:${dbConfig.dbpassword}@${dbConfig.host}:${dbConfig.port}/${dbConfig.dbname}`;
//   }

//   constructor() {  }

//   public get getDB() { return this.db; }

//   public connectToDatabase(dbConfig: IDatabaseConfig, next?: (database: Db) => any) {


//     // Connect to the db
//     // MongoClient.connect(this.mongoURI(dbConfig), (err, db) => {

//     //   if (!err) {
//     //     this.db = db;
//     //     if (next) return next(db);
//     //   }

//     //   console.error('Error while connecting to Database:');
//     //   console.error(err);
//     //   return // next(err);
//     // });
//   };
// }

// let database = new Database();
// export default database;

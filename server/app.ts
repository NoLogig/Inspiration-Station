import { json, urlencoded } from "body-parser";
import * as cors from "cors";
// import * as errorHandler from "errorhandler";
import * as express from "express";
// import { Db } from "mongodb";
import * as logger from "morgan";
import { join } from "path";

// Application Configure Objects
import * as appConfig from "./config";
// Database
// import { database, dbCtrl } from "./mongoDB/index";
// Routers
// import homeRouter from "./routes/home";
// import { simpleCrudRouter as todosRouter } from "./routes/todoRouter";

// Creates and configures an ExpressJS web server.
export class Server {

  // Reference to Express instance
  public app: express.Application = null;

  // Database variable for later reuse
  // public db: Db = null;
  // MongoDataBase Configure Object
  // private dbConfig = appConfig.db;

  // CORS Configure Object
  private corsOptions: cors.CorsOptions = appConfig.corsOptions;

  // Run configuration methods on the Express instance
  constructor() {

    this.app = express();
    // this.database();
    this.middleware();
    this.routes();

  }

  // Configure DataBase
  // private database() {
  //   // Connect to Database an store for later reuse
  //   // database.connectToDatabase(this.dbConfig, (db) => {
  //   //   this.db = db;
  //   // });
  // }

  // Configure Express middleware
  private middleware() {

    // Parser for HTML forms
    this.app.use(json());
    // Parser for query strings
    this.app.use(urlencoded({ extended: false }));
    // Static paths
    this.app.use(express.static(join(__dirname, "/../client")));

    // Set CORS
    this.app.use(cors(this.corsOptions));
    // Enable CORS pre-flight
    this.app.options("*", cors(this.corsOptions));

    // Morgan log HTTP request details
    this.app.use(logger("dev"));
  }

  // Configure Routes & API endpoints
  private routes() {

    // this.app.use("/home", homeRouter);

    // API-Routes
    /* Should stay last, since "/api/todos/:" covers quite a broad range of requests
     * and if it's moved above, it will steal away the endpoints of the more specific implementations. */
    // this.app.use("/api/todos/", todosRouter);

    // In production catch 404 and forward redirect to index
    // if (process.env.NODE_ENV === "production") {
    this.app.use((req, res, next) => {
      res.sendFile(join(__dirname, "/../client/index.html"));
    });
    // }

    // Errorhandler only in development
    // if (process.env.NODE_ENV === "development") {
    //   // catch 404 and forward to errorHandler
    //   this.app.use((req, res, next) => {
    //     let err = new Error("Not Found");
    //     err["status"] = 404;
    //     next(err);
    //   });
    //   this.app.use(errorHandler());
    // }

  }
}

let server = new Server();
export default server;

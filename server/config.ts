export const digest = "sha256";
export const length = 128;
export const secret = "RbBQqA6uF#msRF8s7h*?@=95HUm&DgMDd6zLFn4XzWQ6dtwXSJwBX#?gL2JWf!";

export const apiUrl = "'https://inspiration-station.herokuapp.com/";
export const serverPort = 8080;

export const dbConnectionString = "mongodb://29149/nologig-db"; 
// mongodb://<user>:<pass>@ds129143.mlab.com:27017/no-logig

export const authConfig = {

  facebookAuth : {
    clientID : 'your-secret-clientID', // your App ID
    clientSecret : 'your-client-secret-here', // your App Secret
    callbackURL : 'http://localhost:8080/auth/facebook/callback',
    profileURL : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email'
  },
  twitterAuth: {
    consumerKey: 'your-consumer-key',
    consumerSecret: 'your-client-secret-here',
    callbackURL: 'http://localhost:8080/auth/twitter/callback'
  },
  googleAuth: {
    clientID: 'your-secret-clientID',
    clientSecret: 'your-client-secret-here',
    callbackURL: 'http://localhost:8080/auth/google/callback'
  }
};

export const corsOptions = {

  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "https://inspiration-station.herokuapp.com/",
  // origin: 'http://localhost:4300/api/todos',
  preflightContinue: false
};

export const db = {
  host: "ds129143.mlab.com",
  dbuser: "NoLogig",
  dbpassword: "XXXxxxXXX",
  port: 29143,
  dbname: "nologig-db",
  testsMayDropDb: false
};

const express = require( "express" );
const mongoose = require( "mongoose" );
const mongodbErrorHandler = require( "mongoose-mongodb-errors" );
const helmet = require( "helmet" );
const bodyParser = require( "body-parser" );
const compression = require( "compression" );
const sessions = require( "express-session" );
const SessionStore = require( "express-sessions" );
const flash = require( "connect-flash" );
const logger = require( "./logs/logger" );
const errorHandlers = require( "./handlers/errorHandlers" );

require( "dotenv" ).config( { path: "vars.env" } );
const NODE_ENV = process.env.NODE_ENV;

const app = express();

if ( NODE_ENV === "dev" ) {
  app.use( logger.dev );
} if ( NODE_ENV === "production" ) {
  app.use( logger.writeErrors );
  app.use( logger.writeRequests );
}

const Participant = require( "./models/participant" );

mongoose.Promise = global.Promise;
mongoose.plugin( mongodbErrorHandler );
mongoose.connect( process.env.MONGO );

app.use( helmet( { referrerPolicy: true } ) );

app.set( "view engine", "pug" );
app.set( "views", `${__dirname}/src/pug` );

app.use( express.static( `${__dirname}/public` ) );

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );

app.use( compression() );

const expires = 1000 * 60 * 60 * 24 * 30; // 30 days

app.use( sessions( {
  secret           : process.env.SECRET,
  key              : "<%= moduleName %>",
  name             : "<%= moduleName %>",
  resave           : false,
  saveUninitialized: false,
  cookie           : {
    maxAge  : expires,
    httpOnly: true,
    secure  : true,
  },
  store: new SessionStore( {
    storage   : "mongodb",
    instance  : mongoose,
    collection: "sessions",
    expire    : expires,
  } ),
} ) );
app.use( flash() );

app.use( ( req, res, next ) => {
  // res.locals.h = require( "./helpers/helpers" ); // eslint-disable-line global-require
  res.locals.flashes = req.flash();
  return next();
} );

app.use( "/", require( "./routes" ) );
app.use( "/api", require( "./routes/api" ) );
app.use( ( req, res ) => { throw new Error(); } );

app.use( errorHandlers.notFound );
app.use( errorHandlers.flashValidationErrors );

if ( NODE_ENV === "dev" ) {
  app.use( errorHandlers.developmentErrors );

  process.on( "unhandledRejection", ( err ) => { throw err; } );
} else {
  app.use( errorHandlers.productionErrors );
}

const port = process.env.PORT || 8000;

app.listen( port, () => {
  console.log( `Server running on port ${port}.` ); // eslint-disable-line no-console
} );

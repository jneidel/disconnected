const express = require( "express" );
const router = express.Router();
const u = require( "./utils" );
const User = require( "../models/participant" );
const db = require( "../controllers/database" );

router.get( "/", ( req, res ) => res.render( "welcome", { title: "school" } ) );

router.get( "/start", ( req, res ) => res.render( "start", { title: "start" } ) );

router.get( "/line",
  u.hasId,
  ( req, res, next ) => {
    db.getUser( User, "5b0bb670a2a83b5300d343c7" );
    next();
  },
  ( req, res ) => res.render( "line", { title: "line" } )
);

module.exports = router;

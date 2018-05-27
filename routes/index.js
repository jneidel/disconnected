const express = require( "express" );
const router = express.Router();
const u = require( "./utils" );

router.get( "/", ( req, res ) => res.render( "welcome", { title: "school" } ) );

router.get( "/start", ( req, res ) => res.render( "start", { title: "start" } ) );

router.get( "/line",
  u.hasId,
  ( req, res ) => res.render( "line", { title: "line" } )
);

module.exports = router;

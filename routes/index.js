const express = require( "express" );
const router = express.Router();
const u = require( "./utils" );
const User = require( "../models/participant" );
const db = require( "../controllers/database" );

router.get( "/", ( req, res ) => res.render( "welcome", { title: "#disconnected" } ) );
router.get( "/form", ( req, res ) => res.render( "form", { title: "Willkommen" } ) );
router.get( "/finish", ( req, res ) => res.render( "finish", { title: "Finish" } ) );

router.get( "/line",
  u.hasId,
  async ( req, res, next ) => {
    const data = await db.getAll( User );
    next();
  },
  ( req, res ) => res.render( "line", { title: "Line" } )
);

router.get( "/stats",
  u.hasId,
  ( req, res ) => res.render( "stats", { title: "Statistiken" } )
);

router.get( "/names",
  async ( req, res ) => {
    const data = await db.listUsers( User );

    return res.render( "names", { title: "Namen", names: data } );
  }
);

module.exports = router;

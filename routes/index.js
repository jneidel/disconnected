const express = require( "express" );
const router = express.Router();
const u = require( "./utils" );
const User = require( "../models/participant" );
const db = require( "../controllers/database" );

router.get( "/welcome", ( req, res ) => res.render( "welcome", { title: "#disconnected" } ) );
router.get( "/", ( req, res ) => res.render( "form", { title: "Willkommen" } ) );
router.get( "/finish", ( req, res ) => res.render( "finish", { title: "Finish" } ) );

router.get( "/stats",
  u.hasId,
  async ( req, res, next ) => {
    req.user = await db.getUser( User, req.query.id );

    next();
  },
  ( req, res ) => res.render( "stats", { title: "Statistiken", name: req.user.name, user: req.user } )
);

router.get( "/names",
  async ( req, res ) => {
    const data = await db.listUsers( User );

    return res.render( "names", { title: "Namen", names: data } );
  }
);

router.get( "/all",
  ( req, res ) => res.render( "all", { title: "Gesammelte Statistiken" } )
);

module.exports = router;

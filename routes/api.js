const express = require( "express" );
const router = express.Router();
const User = require( "../models/participant" );
const db = require( "../controllers/database" );

// Routers

router.post( "/create", async ( req, res ) => {
  const data = {
    name  : req.body.name,
    age   : req.body.age,
    gender: req.body.male,
  };

  const id = await db.create( User, data );

  res.json( { id, err: null } );
} );

router.get( "/", ( req, res ) => {
  req.flash( "error", "Access to the API denied." );
  res.redirect( "/login" );
} );
router.get( "/:anything", ( req, res ) => {
  req.flash( "error", "Access to the API denied." );
  res.redirect( "/login" );
} );

module.exports = router;

const express = require( "express" );
const router = express.Router();
const User = require( "../models/participant" );
const db = require( "../controllers/database" );
const u = require( "./utils" );

// Routers

router.post( "/create", async ( req, res ) => {
  const id = await db.create( User, req.body );

  return res.json( { id, err: null } );
} );

router.get( "/get-all", async ( req, res ) => {
  const data = await db.getAll( User );

  return res.json( { data, err: null } );
} );

router.get( "/get-user",
  u.hasId,
  async ( req, res ) => {
    const id = req.query.id;

    const data = await db.getUser( User, id );

    return res.json( { data, err: null } );
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

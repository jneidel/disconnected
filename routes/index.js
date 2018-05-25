const express = require( "express" );
const router = express.Router();

router.get( "/", ( req, res ) => res.render( "welcome", { title: "school" } ) );

module.exports = router;

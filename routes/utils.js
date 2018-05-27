exports.hasId = ( req, res, next ) => {
  if ( req.query.id )
    next();
  else
    res.redirect( "/" );
};

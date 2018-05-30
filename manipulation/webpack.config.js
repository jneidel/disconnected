const path = require( "path" );
const { genScss, babel, polyfill, md, pug } = require( "setup-webpack" );

const prod = false;

const config = [];

[ "index" ].forEach( ( name ) => {
  const scss = genScss( `${name}.css` );
  const entryPath = path.resolve( __dirname, `./src/${name}.bundle.js` );

  config.push( {
    mode  : prod ? "production" : "development",
    entry : prod ? polyfill( entryPath ) : entryPath,
    output: {
      path    : path.resolve( __dirname, "dist" ),
      filename: `${name}.js`,
    },
    module: {
      rules: prod ?
        [ babel, scss.rule, scss.font, pug( `${name}.html` ) ] :
        [ scss.rule, scss.font, pug( `${name}.html` ) ],
    },
    plugins     : [ scss.plugin ],
    optimization: {
      minimize : true,
      minimizer: [ scss.minimizer ],
    },
  } );
} );

module.exports = config;

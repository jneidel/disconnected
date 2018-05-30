const path = require( "path" );
const { genScss, babel, browserSync, polyfill } = require( "setup-webpack" );

require( "dotenv" ).config( { path: "vars.env" } );

const prod = process.env.NODE_ENV === "production";

const sync = browserSync( 8000, 8080 );

const config = [];

[ "welcome", "line", "form", "names", "finish" ].forEach( ( name ) => {
  const scss = genScss( `../css/${name}.css` );
  const entryPath = `./src/bundles/${name}.bundle.js`;

  config.push( {
    mode  : prod ? "production" : "development",
    entry : prod ? polyfill( entryPath ) : entryPath,
    output: {
      path    : path.resolve( __dirname, "public/js" ),
      filename: `${name}.js`,
    },
    module: {
      rules: prod ?
        [ babel, scss.rule, scss.font ] :
        [ scss.rule, scss.font ],
    },
    plugins: prod ?
      [ scss.plugin ] :
      [ scss.plugin ],
    optimization: {
      minimize : true,
      minimizer: [ scss.minimizer ],
    },
  } );
} );

module.exports = config;

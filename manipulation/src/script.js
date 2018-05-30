const d3 = require( "d3" );
const range = require( "py-range" );
const drawBars = require( "./graphs" );
const content = require( "./content" );

const bars = range( 0, content.length )
  .map( q => ( {
    a: { id: `bar${q}a`, node: document.getElementById( `bar${q}a` ) },
    b: { id: `bar${q}b`, node: document.getElementById( `bar${q}b` ) },
  } ) );

drawBars( content, bars );

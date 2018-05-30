const d3 = require( "d3" );
const range = require( "py-range" );
const drawBars = require( "./graphs" );
const content = require( "./content" );
const participants = 7;

const bars = range( 0, content.length )
  .map( q => ( {
    a: { id: `bar${q}a`, node: document.getElementById( `bar${q}a` ) },
    b: { id: `bar${q}b`, node: document.getElementById( `bar${q}b` ) },
  } ) );

const overlay = document.getElementById( "overlay" );
const overlayIpt = document.getElementById( "overlay-ipt" );
const overlaySubmit = document.getElementById( "overlay-submit" );
const contentNode = document.getElementById( "content" );

const parseInput = ipt => {
  const qs = ipt.split( "\n" );

  const anwers = [];

  for ( let q of qs ) {
    if ( q.match( /(hilfe)|(help)/ ) ) {
      overlayIpt.value = `3,2,2\n5,1,0\n1,3,3\n6,1,0\n7,0,0\n1,2,4\n2,5\n5,0,2\n1,2,4\n2,3,2`;
      return null;
    }
    if ( q.match( /[^0-9;,:]/g ) ) {
      overlayIpt.value = `${ipt}\nBitte gib die Ergebnisse als Zahlen an und nutze ',/;/./:' zum trennen der Zahlen. Für ein Beispiel schreibe 'hilfe'.`;
      return null;
    }
    if ( !q.match( /;|,|\.|:/ ) ) {
      overlayIpt.value = `${ipt}\nBitte benutze ',/;/./:' zum Trennen der Zahlen`;
      return null;
    }

    const expectedLen = content[qs.indexOf( q )].c ? 3 : 2;

    try {
      q = q.split( "," );
      q = q.split( ";" );
      q = q.split( "." );
      q = q.split( ":" );
    } catch ( err ) {}

    q = q.map( x => Number( x ) );

    if ( q.length !== expectedLen ) {
      overlayIpt.value = `${ipt}\nEintrag ${qs.indexOf( q )} erfordert ${expectedLen} Antworten, nicht ${q.length}`;
    }

    if ( expectedLen === 2 )
      anwers.push( { a: { l: q[0] }, b: { l: q[1] } } );
    else
      anwers.push( { a: { l: q[0] }, b: { l: q[1] }, c: { l: q[2] } } );
  }

  if ( qs.length < bars.length ) {
    overlayIpt.value = `${ipt}\nNicht genug Antworten geliefert, es gibt ${bars.length} Fragen`;
    return null;
  }

  return anwers;
};

overlaySubmit.addEventListener( "click", () => {
  const rawInput = overlayIpt.value;

  const input = parseInput( rawInput );

  if ( input ) {
    drawBars( content, bars, input );
    overlay.style.display = "none";
    contentNode.style.display = "grid";
  }
} );

// Development
const input = parseInput( `3,2,2\n5,1,0\n1,3,3\n6,1,0\n7,0,0\n1,2,4\n2,5\n5,0,2\n1,2,4\n2,3,2` );

drawBars( content, bars, input );
overlay.style.display = "none";
contentNode.style.display = "grid";

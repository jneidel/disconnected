const d3 = require( "d3" );
const range = require( "py-range" );

const prepBar = ( id, content ) => {
  const qid = id.match( /\d/ )[0];
  const q = content[qid];

  const data = [
    {
      x: 1,
      y: q.a.l,
    },
    {
      x: 2,
      y: q.b.l,
    },

  ];
  if ( q.c )
    data.push( {
      x: 3,
      y: q.c.l,
    }, );

  return { data, correct: q.correct ? q.correct : null };
};

const drawBar = ( id, data, correct ) => {
  const qid = id.match( /\d/ )[0];

  const graph = d3.select( `#${id}` );
  const WIDTH = 500;
  const HEIGHT = 500;
  const MARGINS = {
    top   : 20,
    right : 20,
    bottom: 20,
    left  : 50,
  };

  let xRange = d3.scaleLinear().range( [ MARGINS.left, WIDTH - MARGINS.right ] ).domain( [
    d3.min( data, d => d.x ),
    d3.max( data, d => d.x ),
  ] );
  let yRange = d3.scaleLinear().range( [ HEIGHT - MARGINS.top, MARGINS.bottom ] ).domain( [
    d3.min( data, d => d.y ),
    d3.max( data, d => d.y ),
  ] );

  const xAxis = d3.axisBottom( xRange ).ticks( 10, d3.format( ",.0f" ) );
  const yAxis = d3.axisLeft( yRange ).ticks( 10 );

  graph.append( "svg:g" )
    .attr( "class", "x axis" )
    .attr( "transform", `translate(0,${HEIGHT - MARGINS.bottom})` )
    .call( xAxis );

  graph.append( "svg:g" )
    .attr( "class", "y axis" )
    .attr( "transform", `translate(${MARGINS.left},0)` )
    .call( yAxis );

  yRange = d3.scaleLinear()
    .range( [ HEIGHT - MARGINS.top, MARGINS.bottom ] )
    .domain( [ 0, d3.max( data, d => d.y ) ] );
  xRange = d3.scaleBand()
    .rangeRound( [ MARGINS.left, WIDTH - MARGINS.right ] )
    .padding( 0.1 )
    .domain( data.map( d => d.x ) );

  graph.selectAll( "rect" )
    .data( data )
    .enter()
    .append( "rect" )
    .attr( "x", d => xRange( d.x ) )
    .attr( "y", d => yRange( d.y ) )
    .attr( "width", 50.980 )
    .attr( "height", d => HEIGHT - MARGINS.bottom - yRange( d.y ) )
    .attr( "fill", "grey" );

  if ( correct ) {
    const anwser = correct === "a" ? 0 : correct === "b" ? 1 : 2;

    const rects = graph.selectAll( "rect" );
    d3.select( rects._groups[0][anwser] ).attr( "fill", "#0ed300" );
  }
};

module.exports = ( content, bars, input ) => {
  range( 0, bars.length ).forEach( bar => {
    const ida = bars[bar].a.id;
    const { data: dataa, correct } = prepBar( ida, content );

    drawBar( ida, dataa, correct );

    const idb = bars[bar].b.id;
    const { data: datab } = prepBar( idb, input );

    drawBar( idb, datab, correct );
  } );
};

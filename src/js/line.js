const d3 = require( "d3" );
const axios = require( "axios" );
const graphs = require( "./graphs" );

( async () => {
  const id = window.location.search.split( "=" )[1];

  const rawData = await axios.get( `/api/get-user?id=${id}` )
    .then( response => response.data.data );
  const data = graphs.generateGraphData.ageToTime( rawData );

  const graph = d3.select( "#graph" );
  const WIDTH = 1000;
  const HEIGHT = 500;
  const MARGINS = {
    top   : 20,
    right : 20,
    bottom: 20,
    left  : 100,
  };

  const xRange = d3.scaleLinear()
    .range( [ MARGINS.left, WIDTH - MARGINS.right ] )
    .domain( [
      d3.min( data, d => d.x ),
      d3.max( data, d => d.x ),
    ] )
    .nice();
  const yRange = d3.scaleLinear()
    .range( [ HEIGHT - MARGINS.top, MARGINS.bottom ] )
    .domain( [
      d3.min( data, d => d.y ),
      d3.max( data, d => d.y ),
    ] )
    .nice();

  const xAxis = d3.axisBottom( xRange ).ticks( 10, d3.format( ",.0f" ) ).tickFormat( d => `${d}y` );
  const yAxis = d3.axisLeft( yRange ).ticks( 10 ).tickFormat( d => `${d}m` );

  graph.append( "svg:g" )
    .attr( "class", "x axis" )
    .attr( "transform", `translate(0,${HEIGHT - MARGINS.bottom})` )
    .call( xAxis );

  graph.append( "svg:g" )
    .attr( "class", "y axis" )
    .attr( "transform", `translate(${MARGINS.left},0)` )
    .call( yAxis );

  const lineFunc = d3.line()
    .x( d => xRange( d.x ) )
    .y( d => yRange( d.y ) )
    .curve( d3.curveMonotoneX );

  graph.append( "svg:path" )
    .attr( "d", lineFunc( data ) )
    .attr( "stroke", "blue" )
    .attr( "stroke-width", 2 )
    .attr( "fill", "none" );
} )();

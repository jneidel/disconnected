const d3 = require( "d3" );

const data = [ {
  x: 1,
  y: 5,
}, {
  x: 20,
  y: 20,
}, {
  x: 40,
  y: 10,
}, {
  x: 60,
  y: 40,
}, {
  x: 80,
  y: 5,
}, {
  x: 100,
  y: 60,
} ];

const graph = d3.select( "#graph" );
const WIDTH = 1000;
const HEIGHT = 500;
const MARGINS = {
  top   : 20,
  right : 20,
  bottom: 20,
  left  : 50,
};

const xRange = d3.scaleLinear()
  .range( [ MARGINS.left, WIDTH - MARGINS.right ] )
  .domain( [
    d3.min( data, d => d.x ),
    d3.max( data, d => d.x ),
  ] );
const yRange = d3.scaleLinear()
  .range( [ HEIGHT - MARGINS.top, MARGINS.bottom ] )
  .domain( [
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

const lineFunc = d3.line()
  .x( d => xRange( d.x ) )
  .y( d => yRange( d.y ) )
  .curve( d3.curveMonotoneX );

graph.append( "svg:path" )
  .attr( "d", lineFunc( data ) )
  .attr( "stroke", "blue" )
  .attr( "stroke-width", 2 )
  .attr( "fill", "none" );

const d3 = require( "d3" );
window.d3 = d3;
const d3pie = require( "d3pie" );
const range = require( "py-range" );
const zip = rows => rows[0].map( ( _, c ) => rows.map( row => row[c] ) ); // Equivalent to py-zip

const generateData = {
  ageToTime: data => {
    const lifeExpectancy = 81;
    const timePerYear = data.time * 356;

    const ages = range( data.startingAge, lifeExpectancy + 1 );
    const times = range( 0, timePerYear * ( lifeExpectancy + 1 ), timePerYear );

    const lineData = zip( [ ages, times ] );
    const line = lineData.map( d => ( { x: d[0], y: d[1] } ) );

    return line;
  },
  servicesPie: rawData => {
    const fullServices = {
      fb      : { name: "Facebook", color: "#006ed6" },
      yt      : { name: "YouTube", color: "#e20404" },
      fortnite: { name: "Fortnite", color: "#d1b100" },
      snap    : { name: "Snapchat", color: "#d3d300" },
      twitter : { name: "Twitter", color: "#00a9ff" },
      insta   : { name: "Instagram", color: "#7700ff" },
      nf      : { name: "Netflix", color: "#b21111" },
      steam   : { name: "Steam", color: "#333" },
      cr      : { name: "Clash Royale", color: "#2dd100" },
      tv      : { name: "TV", color: "#000000" },
      wa      : { name: "WhatsApp", color: "#6bcc33" },
    };

    const services = Object.keys( rawData )
      .map( service => ( { value: rawData[service], name: fullServices[service].name, color: fullServices[service].color } ) );

    const data = {
      content  : [],
      sortOrder: "value-desc",
    };

    services.forEach( service => data.content.push( {
      label: service.name,
      value: service.value,
      color: service.color,
    } ) );

    return data;
  },
  ageStartAge: d =>
    range( 0, d.participants.length )
      .map( x => [ d.participants[x].age, d.participants[x].startingAge ] ),
  ageSilent: d =>
    range( 0, d.participants.length )
      .filter( x => d.participants[x].silent )
      .map( x => [ d.participants[x].age, d.participants[x].silent ] ),
  suitableTime: d => [ { x: 1, y: d.suitable }, { x: 2, y: d.time } ],
};
exports.generateData = generateData;

function insertDots( str, seperator = ".", splitAt = 3 ) {
  str = Math.floor( str );
  const rev = String( str ).split( "" ).reverse();
  const dots = Math.floor( rev.length / splitAt );
  const end = rev.length;

  const ranges = range( 0, end + 1, splitAt ).map( x => range( x, x + splitAt + 1, splitAt ) );

  let out = "";

  ranges.reduce( ( acc, cur ) => {
    out += rev.slice( cur[0], cur[1] ).join( "" );
    out += cur[1] < end ? seperator : "";
    return acc;
  }, ranges[0] );

  out = out.split( "" ).reverse().join( "" );

  return out;
}
exports.insertDots = insertDots;

exports.line = ( data, id ) => {
  const graph = d3.select( `#${id}` );
  const WIDTH = 1000;
  const HEIGHT = 600;
  const MARGINS = {
    top   : 20,
    right : 20,
    bottom: 32,
    left  : 200,
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
  const yAxis = d3.axisLeft( yRange ).ticks( 10 ).tickFormat( d => `${insertDots( d )}m` );

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

  d3.selectAll( "#graph>.tick>text" )
    .each( ( d, i ) => d3.select( this ).style( "font-size", 30 ) );
};

exports.pie = ( rawData, id ) => {
  const data = generateData.servicesPie( rawData.services );

  const pie = new d3pie( id, {
    header: {
      title: {
        text    : "Meistgenutzten Services",
        fontSize: "38",
      },
      location: "top-right",
    },
    size: {
      pieOuterRadius: "100%",
      canvasHeight  : 700,
      canvasWidth   : 1000,
    },
    labels: {
      mainLabel: {
        fontSize: 20,
      },
      percentage: {
        fontSize: 20,
      },
    },
    data,
  } );
};

exports.scatterplot = ( data, id, maxY = null ) => {
  const svg = d3.select( `#${id}` );
  const WIDTH = 1000;
  const HEIGHT = 600;
  const MARGINS = {
    top   : 20,
    right : 30,
    bottom: 40,
    left  : 20,
  };

  const xScale = d3.scaleLinear()
    .domain( [ 0, d3.max( data, ( d ) => { return d[0]; } ) ] )
    .range( [ MARGINS.left, WIDTH - MARGINS.right ] )
    .nice();

  const yScale = d3.scaleLinear()
    .domain( [ 0, maxY ? maxY : d3.max( data, ( d ) => { return d[1]; } ) ] )
    .range( [ HEIGHT - MARGINS.top, MARGINS.bottom ] )
    .nice();

  const rScale = d3.scaleLinear()
    .domain( [ 0, d3.max( data, ( d ) => { return d[1]; } ) ] )
    .range( [ 2, 5 ] );

  const xAxis = d3.axisBottom( xScale ).ticks( 5 );
  const yAxis = d3.axisRight( yScale ).ticks( 5 );

  svg.append( "svg:g" )
    .attr( "class", "axis" )
    .attr( "transform", `translate(0,${HEIGHT - MARGINS.bottom})` )
    .call( xAxis );

  svg.append( "svg:g" )
    .attr( "class", "axis" )
    .attr( "transform", `translate(${MARGINS.left},0)` )
    .call( yAxis );

  svg.selectAll( "circle" )
    .data( data )
    .enter()
    .append( "circle" )
    .attr( "cx", ( d ) => {
      return xScale( d[0] );
    } )
    .attr( "cy", ( d ) => {
      return yScale( d[1] );
    } )
    .attr( "r", ( d ) => {
      return rScale( d[1] );
    } );
};

exports.bar = ( data, id ) => {
  const graph = d3.select( `#${id}` );
  const WIDTH = 250;
  const HEIGHT = 400;
  const MARGINS = {
    top   : 20,
    right : 20,
    bottom: 30,
    left  : 50,
  };

  let xRange = d3.scaleLinear()
    .range( [ MARGINS.left, WIDTH - MARGINS.right ] )
    .domain( [
      d3.min( data, d => d.x ),
      d3.max( data, d => d.x ),
    ] );
  let yRange = d3.scaleLinear()
    .range( [ HEIGHT - MARGINS.top, MARGINS.bottom ] )
    .domain( [
      d3.min( data, d => d.y ),
      d3.max( data, d => d.y ),
    ] );

  const xAxis = d3.axisBottom( xRange ).ticks( 0, d3.format( ",.0f" ) );
  const yAxis = d3.axisLeft( yRange ).ticks( 5, d3.format( ",.0f" ) );

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

  const rects = graph.selectAll( "rect" );
  try {
    d3.select( rects._groups[0][0] ).attr( "fill", "#FFC93C" );
    d3.select( rects._groups[0][1] ).attr( "fill", "#FC3A52" );
  } catch ( err ) {}
};

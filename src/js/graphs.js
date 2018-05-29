const range = require( "py-range" );
const zip = rows => rows[0].map( ( _, c ) => rows.map( row => row[c] ) ); // Equivalent to py-zip

exports.generateGraphData = {
  ageToTime: data => {
    const lifeExpectancy = data.gender ? 85 : 90;
    const timePerYear = data.time * 356;

    const ages = range( data.startingAge, lifeExpectancy + 1 );
    const times = range( 0, timePerYear * ( lifeExpectancy + 1 ), timePerYear );

    const lineData = zip( [ ages, times ] );
    const line = lineData.map( d => ( { x: d[0], y: d[1] } ) );

    return line;
  },
};

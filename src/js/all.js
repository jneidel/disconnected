const axios = require( "axios" );
const graphs = require( "./graphs" );

( async () => {
  const rawData = await axios.get( `/api/get-all` )
    .then( response => response.data.data );

  // graphs.pie( rawData, "pie" );

  const d = [
    [ 5, 20 ], [ 480, 90 ], [ 250, 50 ], [ 100, 33 ], [ 330, 95 ],
    [ 410, 12 ], [ 475, 44 ], [ 25, 67 ], [ 85, 21 ], [ 220, 88 ],
  ];

  const ageStartAgeData = graphs.generateData.ageStartAge( rawData );
  graphs.scatterplot( ageStartAgeData, "ageStartAge" );
} )();

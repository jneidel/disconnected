const axios = require( "axios" );
const graphs = require( "./graphs" );

( async () => {
  const rawData = await axios.get( `/api/get-all` )
    .then( response => response.data.data );

  graphs.pie( rawData, "pie" );

  console.log( rawData );

  const ageStartAgeData = graphs.generateData.ageStartAge( rawData );
  graphs.scatterplot( ageStartAgeData, "ageStartAge" );

  const ageSilentData = graphs.generateData.ageSilent( rawData );
  graphs.scatterplot( ageSilentData, "ageSilent", 100 );

  const ageSuitableData = graphs.generateData.ageSuitable( rawData );
  graphs.scatterplot( ageSuitableData, "ageSuitable" );
} )();

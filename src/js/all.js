const axios = require( "axios" );
const graphs = require( "./graphs" );

( async () => {
  const rawData = await axios.get( `/api/get-all` )
    .then( response => response.data.data );

  graphs.pie( rawData );
} )();

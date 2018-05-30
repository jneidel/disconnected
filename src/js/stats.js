const axios = require( "axios" );
const graphs = require( "./graphs" );

( async () => {
  const id = window.location.search.split( "=" )[1];

  const rawData = await axios.get( `/api/get-user?id=${id}` )
    .then( response => response.data.data );

  const lineData = graphs.generateData.ageToTime( rawData );

  graphs.line( lineData );

  // To find out on the fly which user it is, i.e. for naming conflict
  document.getElementsByTagName( "h1" )[0].addEventListener( "click", () => {
    window.alert( JSON.stringify( rawData ) ); // eslint-disable-line no-alert
  } );
} )();


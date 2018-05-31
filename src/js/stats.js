const axios = require( "axios" );
const graphs = require( "./graphs" );

( async () => {
  const id = window.location.search.split( "=" )[1];

  const rawData = await axios.get( `/api/get-user?id=${id}` )
    .then( response => response.data.data );

  if ( rawData.age ) {
    const lineData = graphs.generateData.ageToTime( rawData );

    graphs.line( lineData, "graph" );

    const timeLeft = 81 - rawData.age;
    if ( timeLeft > 10 ) {
      document.getElementById( "nutzung" ).innerHTML = `Bei gleichbleibender Mediennutzung (${rawData.time} min) wirst du über die nächsten <span class="white">10 Jahre ${graphs.insertDots( rawData.time * 356 * 10 )} min</span> mit sozialen Medien/Entertainment verbringen. Umgerechnet sind dies <span class="white">${graphs.insertDots( rawData.time * 356 * 10 / 60 / 24 )} Tage</span>.`;
    }
  } else {
    [ ...document.getElementsByClassName( "medien-alter" ) ].forEach( x => x.style.display = "none" );
  }

  // To find out on the fly which user it is, i.e. for naming conflict
  document.getElementsByTagName( "h1" )[0].addEventListener( "click", () => {
    window.alert( JSON.stringify( rawData ) ); // eslint-disable-line no-alert
  } );
} )();


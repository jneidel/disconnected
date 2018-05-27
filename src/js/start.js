const axios = require( "axios" );
const byId = ipt => document.getElementById( ipt );

function getValues() {
  return {
    name: byId( "name" ).value,
    age : byId( "age" ).value,
    male: byId( "male" ).checked,
  };
}

const next = byId( "next" );
next.addEventListener( "click", async ( e ) => {
  const data = getValues();

  const id = await axios.post( "/api/create", data )
    .then( response => response.data.id );

  window.location.replace( `/line?id=${id}` );
} );

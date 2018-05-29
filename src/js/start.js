const axios = require( "axios" );
const byId = ipt => document.getElementById( ipt );

function getValues() {
  return {
    name       : byId( "name" ).value,
    age        : byId( "age" ).value,
    male       : byId( "male" ).checked,
    startingAge: byId( "startingAge" ).value,
    time       : byId( "time" ).value,
  };
}

const next = byId( "next" );
next.addEventListener( "click", e => {
  const data = getValues();

  const id = axios.post( "/api/create", data );

  window.location.replace( `/finish` );
} );

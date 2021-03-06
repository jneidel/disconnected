const axios = require( "axios" );
const byId = ipt => document.getElementById( ipt );

function getValues() {
  const services = [ ...document.getElementsByName( "services" ) ]
    .map( x => ( { checked: x.checked, name: x.id.match( /s-(\w*)/ )[1] } ) )
    .filter( x => x.checked )
    .map( x => x.name );

  return {
    name       : byId( "name" ).value,
    age        : byId( "age" ).value,
    startingAge: byId( "startingAge" ).value,
    time       : byId( "time" ).value,
    services,
    silent     : byId( "silent" ).value,
    suitable   : byId( "suitable" ).value,
  };
}

const next = byId( "next" );
next.addEventListener( "click", e => {
  const data = getValues();

  console.log( data );

  const id = axios.post( "/api/create", data );

  window.location.replace( `/finish` );
} );

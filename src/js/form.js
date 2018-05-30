const axios = require( "axios" );
const byId = ipt => document.getElementById( ipt );

function getValues() {
  const fullServices = {
    fb      : "Facebook",
    yt      : "YouTube",
    fortnite: "Fortnite",
    snap    : "Snapchat",
    twitter : "Twitter",
    insta   : "Instagram",
    nf      : "Netflix",
    steam   : "Steam",
  };

  const services = [ ...document.getElementsByName( "services" ) ]
    .map( x => ( { checked: x.checked, name: x.id.match( /s-(\w*)/ )[1] } ) )
    .filter( x => x.checked )
    .map( x => fullServices[x.name] );

  return {
    name       : byId( "name" ).value,
    age        : byId( "age" ).value,
    startingAge: byId( "startingAge" ).value,
    time       : byId( "time" ).value,
    services,
  };
}

const next = byId( "next" );
next.addEventListener( "click", e => {
  const data = getValues();

  console.log( data );

  const id = axios.post( "/api/create", data );

  // window.location.replace( `/finish` );
} );

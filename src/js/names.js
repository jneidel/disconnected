const axios = require( "axios" );

document.getElementById( "new" ).addEventListener( "click", () => axios.post( "/api/create", { name: "---------" } ) );

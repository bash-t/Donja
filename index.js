var u = require( 'util' );
var daemonHub = require( './daemonHub' );
var http = require( 'http' );
var conf = require( './config' );

//cradle = require( 'cradle' );
//request = require( 'request' );
var handleWithObject = {
   //    db : db.connection,
};

//TODO: listen the changes feed and for every new doc call dRouter.process
var doc = { 
   _id: 1234,
   _rev: 4567
};

var subscribeChangesFeed = function( changesUrl, callback ) { 
   http.request( { host: 'admin:admin@localhost', port: 5984, path: 'dummydata/_changes?feed=continuous&include_docs=false&since=110', method: 'GET' }, function( err, resp, body ) {
      if ( err ) {
         throw err;
      }
      console.log( 'fetched ' + changesUrl )

      callback( resp, body );
   } );
}

console.log( 'subscribing changes feed...' );

//subscribeChangesFeed( 'http://admin:admin@localhost:5984/dummydata/_changes?feed=continuous&include_docs=false&since=110', function( resp, body ) {
//      console.log( 'resp: ' + resp );
//      console.log( 'body: ' + body );
//} );


daemonHub.init( './daemons', function( err ) { 
   if ( err ) {
      throw err;
   }
   daemonHub.process( doc, handleWithObject );
} )

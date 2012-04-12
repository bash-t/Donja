var daemonHub = require( './daemonHub' ).init('./daemons');
//var cradle = require( 'cradle' );
//var request = require( 'request' );
var http = require( 'http' );
var conf = require( './config' );

var handleWithObject = {
//    db : db.connection,
};

//TODO: listen the changes feed and for every new doc call dRouter.process
var doc = {  };

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

daemonHub.process( doc, handleWithObject );

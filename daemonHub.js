var fs = require( "fs" );

/*
* Variables
*/
var dList = { };

/*
* Exports
*/
exports.process = processDaemons;
exports.init = init;

/*
* Functions
*/
//checks the file system for daemons and fetches them in an array.
function init( daemonPath ) { 
   console.log( 'Starting DaemonHub...' )
   fs.readdir( daemonPath, function( err, files ) { 
      if ( err ) {
         throw err;
      }

      for ( var i in files ) {
         file = files [ i ];

         dot = file.lastIndexOf( '.' );
         dName = file.substring( 0, dot );
         dExtension = file.substring( dot + 1, file.length );

         if( dExtension.toLowerCase() == "js" ) {
            //import daemon
            currDaemon = require( daemonPath + '/' + dName );
            //check if daemon have a valid structure
            if ( currDaemon.handle != undefined && typeof currDaemon.handle === "function" 
               && currDaemon.isInterestedOn != undefined && typeof currDaemon.isInterestedOn === "function"
               && ( currDaemon.isInterestedOn() || !currDaemon.isInterestedOn() ) ) { 
               //add it to the deamon list
               dList[ dName ] = currDaemon;
               console.log( dName + ' initialized.' );
   console.log(  '+++'             +  dList [ dName ]);
            } else { 
               console.log( dName + ' does not export the expected set of functions. Ignoring the daemon.' );
            }
         }
      }
      console.log( "DaemonHub started." );
   } );

   return this;
   //return exports.process = processDaemons;
}

function processDaemons( doc, helperObj ) { 
   console.log ( dList[ 'daemon1' ] );
   for( var i in dList ) {
      console.log( "calling daemon: " + i );
      dList[ i ].handle( doc, helperObj );
   }
};


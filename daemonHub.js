var fs = require( 'fs' );
var u = require( 'util' );

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
function init( daemonPath, callback ) { 
   console.log( 'starting DaemonHub...' )
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
               console.log( '  ' + dName + ' initialized.' );
            } else { 
               console.log( dName + ' does not export the expected set of functions. Ignoring the daemon.' );
            }
         }
      }

      //check if at least one valid daemon is loaded
      if( isEmpty( dList ) ) {
         err = 'no daemon initialized.';
      }

      console.log( 'DaemonHub started.' );
      callback( err );
   } );
}

function processDaemons( doc, helperObj ) { 
   for( var i in dList ) {
      console.log( 'calling daemon: ' + i + ' with document: ' + u.inspect( doc) );
      dList[ i ].handle( doc, helperObj );
   }
};

function isEmpty( obj ) { 
   for( var i in obj ) {
      return false;
   }
   return true;
}

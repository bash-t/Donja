exports.handle = handle;
exports.isInterestedOn = isInterestedOn;

function handle( doc, helperObj ) { 
   console.log( "  in daemon: daemon2");
}

function isInterestedOn( doc ) { 
   //ducktyping if the daemon needs to handle the doc.
   return false;
}

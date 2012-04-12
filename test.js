exports = function( dir ){ 
   var dir = dir;
   function name() {
      console.log( dir );
   }

   var name2 = function () {
      console.log( dir );
   }
   return this;
}

profileApp=angular.module('profileApp');

profileApp.filter('passwd', function() {

  return function(input, charMask) {

    input = input || '';
    charMask = charMask || '*'
    
    var out = "";
    for (var i = 0; i < input.length; i++) {
      out += charMask
    }

     return out;

  }

});

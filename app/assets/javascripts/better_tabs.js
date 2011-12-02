//= require jquery.better-tabber
//= require jquery.better-pills

$(document).ready(function(){
  if( window.location.hash ) {
    var tab = window.location.hash.substring(1);
    $('a[href="#'+ tab + '"]').trigger('click');
  }

});

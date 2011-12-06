
// = link_to 'Photos', '.photos'     - Normal links
// http://localhost:3000/users/#photos

// To load via AJAX with relative and absolute URLs

// = link_to 'Photos', '..photos', {:for => "photos"} to load a tab for with relative path
// http://localhost:3000/users/#.photos

// = link_to 'Photos', './movies/photos', {:for => "photos"} to load a tab for with path as /photos/
// http://localhost:3000/users/#/movies/photos

// The remote .js.haml that is being loaded should have something like this
// '$('#photos_list').addClass("hidden");
// '$('#photos_list').html( '#{escape_javascript( render 'list', :photos => @photos, :photo => @photo, :remote => true ) }' );
// '$('#photos_list').removeClass("hidden");

// Note: The starting . will be removed, For AJAX loading of relative paths, the "." will be present

// Also auto loads based on the tab that is active

// TODO : Show from cache instead of loading everytime an AJAX link is clicked

var Tabber = {
  init : function(name, options){
    options = options || {};
    var tabClass =   options.tabClass || 'tabs' ;

    var tabs = $( name + '> .' + tabClass);
    var tab_datas = $(name + '> .data > div:not(.mask)').addClass('hidden');
    var current = $(name + ' >  .' + tabClass + ' > li.active > a').attr('href');

    $('li a', tabs).unbind('click').bind('click', function(ev){
        ev.stopPropagation();
        var el = $(this),
            url = el.attr('href'),
            fortab = el.attr('for');

        tab_datas.addClass('hidden');

        if( url[0] == '.' && (url[1] == '/' || url[1] == '.') ){

          url = url.substring(1); // strip off the .
          $( fortab ).removeClass('hidden');

          if(url[0] == ".")
            url = window.location.pathname + "/" + url.substring(1);

          $.ajax( {
            url : url,
            dataType : 'script',
            beforeSend : function(){ $('.data', name).addClass('loading'); },
            complete: function(){ $('.data', name).removeClass('loading') }
          } );

        }
        else
          $(url, '.data').removeClass('hidden');

        $('li.active', tabs).removeClass('active');
        el.closest('li').addClass('active');

        window.location.hash = el.attr('href').replace(/^\./,"");

        return false;
    });

    if( window.location.hash )
      var tab = "."+window.location.hash.substring(1);
    else
      var tab = current;

    if( current )
      $( current, '.data').removeClass('hidden');

    $('a[href="' + tab +'"]').trigger('click');

  }
}

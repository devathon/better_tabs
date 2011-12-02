
// A better tab interface which support navigation easier and
// provide good support for dynamic content and tabs addition

var Pills = function(name){
    var ul = $( name + '> ul.tabs');
    var region = $(name + '> .data');

    this.tabs = $('li', ul);
    this.areas = $('.data > div:not(.mast)', name);

    this.name = name;
    var self = this;

    this.addTab = function(id, anchor, options ){
      var link = $('<li></li>').html(anchor)
      ul.append( link );

      anchor.bind('click', this.switchHandle);

      var elid = ".data " + id;
      var data = $('<div></div>').addClass( options.classList )
                                 .attr('id', id)
                                 .html(options.content);

      region.prepend(data);

      if( options && options.active )
          self.makeActive( link, elid );

      if( options.callback ) options.callback();


      this.tabs = $('li', ul);
      this.areas = $('.data > div:not(.mast)', name);

    },

    this.makeActive = function( link , area){
      this.clickTab(link);
      this.tabs.removeClass('active');
      this.areas.addClass('hidden');
      $(link, self.name ).addClass('active');
      $(area, self.name).removeClass('hidden');
    }


    this.clickTab = function(link){

      var url = $('a', link).attr('href'),
          fortab = $('a', link).attr('for');

      if( url[0] == '/'){
        $.ajax( {
          url : url,
          dataType : 'script',
          beforeSend : function(){ $('.data', name).addClass('loading'); },
          complete: function(){ $('.data', name).removeClass('loading') }
        } );

      }
    }

    this.switchHandle = function(ev){
      ev.stopPropagation();
      var el = $(this),
          url = el.attr('href'),
          fortab = el.attr('for'),
          parent = el.closest('li');
      self.makeActive( parent, $( fortab || url, region) );
      return false;
    }

    this.init = function(options){
      var active = ( options && options.active ) ? $(options.active) : $('li.active', ul);
      active = active.length > 0 ? active : self.tabs[0];
      var area = $( $('a', active).attr('for') || $('a', active).attr('href'), this.name );


      $('li a', ul).unbind('click').bind('click', this.switchHandle);

      self.makeActive( active, area );
      return this;
    }
}

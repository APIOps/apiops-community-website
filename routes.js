Router.map(function() {

  Router.configure({
    loadingTemplate: 'loading'
  });

  this.route('home', {
    path: '/'
  });

  this.route('codeOfConduct', {
    path: '/about/code-of-conduct'
  });

  this.route('about', {
    path: '/about'
  });

  this.route('tools', {
    path: '/about/tools'
  });

  this.route('manifesto', {
    path: '/about/manifesto'
  });

  this.route('notFound', {
    path: '*',
    where: 'server',
    action: function() {
      this.response.statusCode = 404;
      this.response.end(Handlebars.templates['404']());
    }
  });

  Router._scrollToHash = function(hash) {
    var section = $(hash);
    if (section.length) {
      var sectionTop = section.offset().top;
      $("html, body").animate({
        scrollTop: sectionTop
      }, "slow");
    }
  };
});

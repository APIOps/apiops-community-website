Meteor.startup(function() {
  if(Meteor.isClient) {
    SEO.config({
      title: 'APIOPS Portal',
      meta: {
        'description': 'APIOPS Portal'
      },
      ignore: {
        meta: ['fragment', 'viewport', 'msapplication-TileColor', 'msapplication-TileImage', 'msapplication-config'],
        link: ['stylesheet', 'apple-touch-icon', 'rel', 'shortcut icon', 'icon']
      }
    });
  }
});

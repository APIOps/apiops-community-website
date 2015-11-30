Meteor.startup(function() {
  if (Meteor.isClient) {
    return SEO.config({
      title: 'APIOps Community',
      meta: {
        'description': 'APIOps Community Page'
      }
    });
  }
});

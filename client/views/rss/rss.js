Template.rss.helpers({
  rss: function () {
    return Rss.find({},{sort: {pubDate: -1}, limit: 5});
  }
});

Meteor.subscribe('rss');

UI.registerHelper("fromNowRSS", function(datetime) {
  return new moment(datetime).fromNow();
});

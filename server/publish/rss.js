Meteor.publish('rss', function() {
  return Rss.find({},{sort: {pubDate: -1}, limit: 5});
});

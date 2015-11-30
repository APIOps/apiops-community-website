Meteor.methods({
  'getRss':function(){
    //console.log("Rss called");
    Rss.remove({});
    getRSS('http://apisuomi.fi/category/apiops/feed/');
  }
});

function getRSS(feedURL){
  var FeedParser = Meteor.npmRequire('feedparser'), request = Meteor.npmRequire('request');
  var req = request(feedURL), feedparser = new FeedParser();
  var Fiber = Npm.require( "fibers" );

  req.on('error', function (error) {
    // handle any request errors
  });

  req.on('response', function (res) {
    var stream = this;
    if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
    stream.pipe(feedparser);
  });

  feedparser.on('error', function(error) {
    // always handle errors
  });
  feedparser.on('readable', function() {
    // This is where the action is!
    var stream = this, meta = this.meta, item;

    while (item = stream.read()) {
      Fiber( function(){
        Rss.insert({
          title: item.title,
          pubDate: item.pubDate,
          link: item.link
        });
        Fiber.yield();
      }).run();
    }
  });
}

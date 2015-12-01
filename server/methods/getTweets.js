Meteor.methods({
  'getTwitter': function(){
    Tweets.remove({});
    return getTweets();
  }
});

var getTweets = function (){

  var Twit = Meteor.npmRequire('twit');
  var Twitter = new Twit({
    consumer_key:         "B8OvEIfqW4CeqCbb8XlW5PWFx",
    consumer_secret:      "t0kVTAyV83aXfNMIUdYmkAqVlg1aeRuw9TiBzsUwe6jQkRmddN",
    access_token:         "2852379923-4vnSSsmXfgmeZ73Y872q6Jlcy82MBfOjXpP2PfJ",
    access_token_secret:  "GyqulJVL5upmtpTe8mZAeE6RaoipRfJnbDBV6SHylmg1D"
  });

  var Future = Npm.require("fibers/future");
  var fut = new Future();
  var Fiber = Npm.require( "fibers" );
  var d = new Date();
  var m = d.getMonth()+1;
  var day = d.getDate();
  var today = d.getFullYear()+"-"+m+"-"+day;
  var query = 'from:apiops since:2011-11-11';
  //query = 'meteorjs since:' + today;
  Twitter.get('search/tweets',
              {
    q: query,
    count: 4
  },
              function(err, data, response) {
    if (!err){
      //console.log("Twitter..." + data.statuses.length + "...." + today);
      Fiber( function(){
        for (var i=0, len=data.statuses.length; i<len; i++){
          var tweet = data.statuses[i];
          Tweets.insert({
            text: tweet.text,
            from: tweet.user.screen_name,
            avatar: tweet.user.profile_image_url,
            created_at: tweet.created_at
          });
        }
        Fiber.yield();
      }).run();

      fut.return("");
    } else {
      fut.return(err +" - " + response);
    }
  }
             );
  return fut.wait();
}

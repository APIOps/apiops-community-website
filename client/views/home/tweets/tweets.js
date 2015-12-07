Template.twitterfeed.helpers({
  tweets: function(){
    return Tweets.find({});
  }
});

Meteor.subscribe('tweets');

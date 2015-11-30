Meteor.startup(function () {
  Meteor.call('getRss');
});

SyncedCron.add({
  name: 'Get Latest News',
  schedule: function(parser) {
    return parser.text('every 1 day');
  },
  job: function() {
    Meteor.call('getRss');
  }
});

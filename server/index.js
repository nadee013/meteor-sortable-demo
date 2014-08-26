Meteor.methods({
  'newIdea': function(name, group) {
    var position = Ideas.find({'group': null}).count();
    Ideas.insert({
      "name": name,
      "group": null,
      "position": position + 1,
      "created": Date.now()
    });
  },

  'moveIdea': function(idea, group, position) {
    Ideas.update({'_id': idea}, {$set: {'group': group, 'position': position}});
  },

  'newGroup': function(name) {
    Groups.insert({
      "name": name,
      "created": Date.now()
    });
  }
});
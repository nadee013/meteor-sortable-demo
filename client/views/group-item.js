Template.groupItem.helpers({
  'ideas': function() {
    var ideas = Ideas.find({group: this._id}, {sort: {"position": 1}}).fetch();
    return ideas;
  }
});

Template.groupItem.rendered = function() {
  $(".sortable-groups").sortable({
    connectWith: ".sortable-non-group, .sortable-groups",
    dropOnEmpty: true,
    appendTo: document.body,
    stop: function(e, ui) {
      console.log("------group-----------stop");
      
      var id = $(ui.item[0]).attr("data-id");
      var group = $(ui.item).parent().attr("data-id");
      console.log(id, group);

      var prev = $(ui.item[0]).prev().attr("data-pos");
      var next = $(ui.item[0]).next().attr("data-pos");
      
      var position = setNewPos(prev, next, group);
      console.log("--------position----------------", position);

      Meteor.call("moveIdea", id, group, position, function(err) {
        if(err) {
          return alert(err.reason);
        } else {
          console.log("moved from 2-1");
        }
      });
    }
  });
}

setNewPos = function(pre_pos, next_pos) {
  var newPosition = 0;
  if(!pre_pos && !next_pos) {
    // console.log("----with out both");
    var group = Groups.find({_id: group}).count();
    newPosition = group + 1;
  } else if(!pre_pos) {
    // console.log("----no-pre");
    newPosition = setPositions.beforeFirst(parseFloat(next_pos));
  } else if(!next_pos) {
    // console.log("----no-next");
    newPosition = setPositions.afterLast(parseFloat(pre_pos));
  } else {
    // console.log("----with both");
    newPosition = setPositions.between(parseFloat(pre_pos), parseFloat(next_pos));
  }
  return newPosition;
}

var setPositions = {
  beforeFirst: function (firstRank) { return (firstRank / 2); },
  between: function (beforeRank, afterRank) { return ((beforeRank + afterRank) / 2); },
  afterLast: function (lastRank) { return (lastRank + 1); }
};
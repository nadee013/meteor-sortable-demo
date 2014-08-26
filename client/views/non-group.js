Template.nonGroupItem.helpers({
'ideas': function() {
    var ideas = Ideas.find({group: null}, {sort: {'position': 1}}).fetch();
    return ideas;
  }
});

Template.nonGroupItem.rendered = function() {
  $(".sortable-non-group").sortable({
    connectWith: ".sortable-groups",
    dropOnEmpty: true,
    stop: function(e, ui) {
      console.log("---------non- group--------- stop-----");

      var id = $(ui.item[0]).attr("data-id");
      var group = $(ui.item).parent().attr("data-id");
      console.log(id, group);
      var prev = $(ui.item[0]).prev().attr("data-pos");
      var next = $(ui.item[0]).next().attr("data-pos");
      if(!group) {
        group = null;
      }    
      
      var position = setNewPos(prev, next);
      console.log("---position-------", prev, next, position);
      
      Meteor.call("moveIdea", id, group, position, function(err) {
        if(err) {
          return alert(err.reason);
        } else {
          console.log("moved from non to group");
        }
      });
      // console.log("--non-----", $(ui.item).parent()[0], this);
      // console.log('non-----pre------', $(ui.item[0]).prev());
    }
  });
}
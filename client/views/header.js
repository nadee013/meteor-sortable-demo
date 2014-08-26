Template.header.events({
  'click #addIdea': function(event) {
    event.preventDefault();
    var name = $("#newIdea").val().trim();
    if(name) {
      Meteor.call("newIdea", name, function(err) {
        if(err) {
          return alert(err.reason);
        }
        $("#newIdea").val("");
      });
    }
  },

  'click #addGroup': function(event) {
    event.preventDefault();
    var name = $("#newGroup").val().trim();
    if(name) {
      Meteor.call("newGroup", name, function(err) {
        if(err) {
          return alert(err.reason);
        }
        $("#newGroup").val("");
      });
    }
  }
});
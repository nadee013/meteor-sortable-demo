Template.groupList.helpers({
  list: function() {
    var groups = Groups.find({}, {sort: {"created": -1}}).fetch();
    return groups;
  }
});
FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render('layout', {content: 'home'});
  }
});

FlowRouter.route('/u/:id', {
  action: function() {
    BlazeLayout.render('layout', {content: 'userGifs'});
  }
});

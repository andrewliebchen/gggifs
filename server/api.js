// Global API configuration
var Api = new Restivus({
  useDefaultAuth: true,
  prettyJson: true,
  version: 'v1'
});

// Generates: POST on /api/users and GET, DELETE /api/users/:id for
// Meteor.users collection
Api.addCollection(Meteor.users, {
  excludedEndpoints: ['getAll', 'put', 'delete', 'post'],
  routeOptions: {
    authRequired: false
  },
  endpoints: {
    get: {
      authRequired: false,
      action: function() {
        const userId = this.urlParams.id;
        console.log(userId);
        const keyword = this.queryParams.keyword;
        const gif = Gifs.findOne({parent_id: userId, keywords: keyword});
        console.log(gif);
        return { json: gif }
      }
    }
  }
});

const Api = new Restivus({
  useDefaultAuth: true,
  prettyJson: true,
  version: 'v1'
});

Api.addCollection(Meteor.users, {
  excludedEndpoints: ['getAll', 'put', 'delete', 'post'],
  routeOptions: {
    authRequired: false
  },
  endpoints: {
    get: {
      authRequired: false,
      action: function() {
        const gif = Gifs.findOne({
          parent_id: this.urlParams.id,
          keywords: this.queryParams.keyword
        });

        return { json: gif }
      }
    }
  }
});

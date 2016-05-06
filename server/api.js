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
        const id = this.urlParams.id;

        const tag = this.queryParams.tag;
        const gifs = Gifs.find({
          parent_id: id,
          tags: tag
        }).fetch();
        const randomIndex = Math.floor( Math.random() * gifs.length );
        const randomGif = gifs[randomIndex];

        const user = Meteor.users.findOne(id, {fields: {_id: 1, profile: 1}});

        if(tag) {
          return { json: randomGif }
        } else {
          return { json: user };
        }
      }
    }
  }
});

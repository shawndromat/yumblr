window.Yumblr.Models.Step = Backbone.Model.extend({
  initialize: function (attrs, options) {
    this.recipe = options.recipe
  },
  urlRoot: function () {
    return this.collection.recipe.url() + "/steps"
  }
});

window.Yumblr.Models.Step = Backbone.Model.extend({
  initialize: function (options) {
    this.recipe = options.recipe;
  },
  urlRoot: function () {
    return this.recipe.url() + "/steps"
  }
});

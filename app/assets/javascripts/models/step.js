window.Yumblr.Models.Step = Backbone.Model.extend({
  urlRoot: function () {
    return this.collection.recipe.url() + "/steps"
  }
});

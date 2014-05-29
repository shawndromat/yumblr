window.Yumblr.Views.RecipeSearch = Backbone.CompositeView.extend({
  template: JST["recipes/recipe_search"],
  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});

window.Yumblr.Views.RecipeSearch = Backbone.View.extend({
  template: JST["recipes/recipe_search"],
  render: function () {
    var content = this.template();
    this.$el.html(content);
    setTimeout(function () {
      $("#search").addClass("open");
    }, 500)
    return this;
  }
});

window.Yumblr.Views.RecipesIndex = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render)
  },
  tagName: "ul",
  className: "row recipes",
  template: JST["recipes_index"],
  render: function () {
    var content = this.template({recipes: this.collection});
    this.$el.html(content);
    return this;
  }
});

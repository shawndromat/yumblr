window.Yumblr.Views.RecipesIndex = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render)
  },
  tagName: "div",
  className: "row",
  template: JST["recipes_index"],
  // events: {
  //   'click .index-card': 'navShow',
  // },
  render: function () {
    var content = this.template({recipes: this.collection});
    this.$el.html(content);
    return this;
  },
  leave: function () {
    this.remove();
  }
});

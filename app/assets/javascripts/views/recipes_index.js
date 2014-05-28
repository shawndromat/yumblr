window.Yumblr.Views.RecipesIndex = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.collection, 'sync change add', this.render)
  },
  tagName: "div",
  className: "row",
  template: JST["recipes/recipes_index"],
  render: function () {
    var content = this.template({recipes: this.collection});
    this.$el.html(content);
    var $active = $(".btn-group a[href='#" + location.href.split("#")[1] + "']");
    $active.siblings().removeClass("active");
    $active.addClass("active");
    return this;
  },

});

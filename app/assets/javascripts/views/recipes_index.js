window.Yumblr.Views.RecipesIndex = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.collection, 'sync change add reset', this.render)
  },
  tagName: "div",
  className: "row",
  template: JST["recipes/recipes_index"],
  render: function () {
    var content = this.template({recipes: this.collection});
    this.$el.html(content);
    var loc = location.href.split("#")[1];
    var $active = this.$el.find(".btn-group a[href='#" + loc + "']");
    $active.siblings().removeClass("active");
    $active.addClass("active");
    if (location.href.indexOf("#") === -1 ) {
      this.$(".btn-group a[href='#']").addClass("active");
    }
    return this;
  },

});

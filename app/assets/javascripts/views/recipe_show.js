window.Yumblr.Views.RecipeShow = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.model, 'sync change', this.render);
  },
  template: JST["recipe_show"],
  render: function () {
    var content = this.template({recipe: this.model});
    this.$el.html(content);
    return this;
  },

});

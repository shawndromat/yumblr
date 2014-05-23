window.Yumblr.Views.IngredientEntryShow = Backbone.View.extend({
  className: "row ingredient-entry",
  template: JST["ingredient_entries/ingredient_entry_show"],
  render: function () {
    var content = this.template({entry: this.model});
    this.$el.html(content);
    return this;
  }
});

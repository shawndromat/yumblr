window.Yumblr.Views.IngredientEntryForm = Backbone.View.extend({
  className: "row entry-form",
  template: JST["ingredient_entries/ingredient_entry_form"],
  render: function () {
    var content = this.template({entry: this.model});
    this.$el.html(content);
    return this;
  }
});

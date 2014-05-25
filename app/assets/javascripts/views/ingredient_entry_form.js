window.Yumblr.Views.IngredientEntryForm = Backbone.View.extend({
  className: "row",
  template: JST["ingredient_entries/ingredient_entry_form"],
  events: {
    "click .remove-item": "remove"
  },
  render: function () {
    var content = this.template({entry: this.model});
    this.$el.html(content);
    this.$(".fraction-select").attr("selectedIndex", -1);
    return this;
  }
});

window.Yumblr.Views.IngredientEntryForm = Backbone.View.extend({
  initialize: function (options) {
    this.parent = options.parent;
    this.listenTo(this.model, "sync change", this.render);
  },
  className: "row entry-main ingredient-entry",
  template: JST["ingredient_entries/ingredient_entry_form"],
  events: {
    "click .remove-item": "removeEntry"
  },
  render: function () {
    var content = this.template({entry: this.model});
    this.$el.html(content);
    this.$(".fraction-select").attr("selectedIndex", -1);
    return this;
  },
  removeEntry: function () {
    this.remove();
    this.parent.saveRanks("#new-ingredients", ".ingredient-entry")
    this.parent.removeSubview("#new-ingredients", this);
  }
});

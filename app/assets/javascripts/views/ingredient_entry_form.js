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
    this.$(".unit-select").val((this.model.get("unit") || "unit"));
    this.$(".fraction-select").val((this.model.get("fraction") || "fraction"));
    return this;
  },
  removeEntry: function () {
    if (this.parent.subviews()["#new-ingredients"].length > 1) {
      this.remove();
      this.parent.saveRanks("#new-ingredients", ".ingredient-entry");
      this.parent.removeSubview("#new-ingredients", this);
    }
  }
});

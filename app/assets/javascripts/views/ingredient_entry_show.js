window.Yumblr.Views.IngredientEntryShow = Backbone.View.extend({
  initialize: function (options) {
    this.triggerForm = options.triggerForm;
    this.parent = options.parent;
    this.listenTo(this.model, "sync change", this.render);
  },
  className: "ingredient-entry row",
  template: JST["ingredient_entries/ingredient_entry_show"],
  formTemplate: JST["ingredient_entries/ingredient_entry_form"],
  events: {
    "click .edit-entry": "editEntry",
    "click .save-item": "saveEntry",
    "blur .edit-entry": "saveEntry",
    "click .remove-item": "removeEntry"
  },
  render: function () {
    var content = this.template({
      entry: this.model,
      recipe: this.parent.model
    });
    this.$el.html(content);
    if (this.triggerForm) {
      this.editEntry();
    }
    return this;
  },
  editEntry: function (event) {
    var form = this.formTemplate({entry: this.model});
    this.$el.html(form);
    this.$(".edit-button").hide();
    this.$(".unit-select").val((this.model.get("unit") || "unit"));
    this.$(".fraction-select").val((this.model.get("fraction") || "fraction"));
    this.$(".entry-ingredient").focus();
  },
  saveEntry: function () {
    var attrs = {
      amount: this.$(".entry-amount").val(),
      rank: this.$(".entry-rank").val(),
      fraction: this.$(".fraction-select").val(),
      unit: this.$(".unit-select").val(),
      ingredient_name: this.$(".entry-ingredient").val(),
      recipe_id: this.model.recipe.id
    }
    if (attrs.ingredient_name) {
      this.model.set(attrs);
      var view = this;
      this.model.save({ingredient_entry: attrs}, {
        success: function (model) {
          view.triggerForm = false;
        }
      });
    }
  },
  removeEntry: function () {
    var view = this;

    function success (model) {

      view.remove();
      view.parent.saveRanks("#ingredient-entries", ".ingredient-entry")
      view.parent.removeSubview("#ingredient-entries", view);
      view.collection.remove(model);
    }

    if (this.model.id) {
      this.model.destroy({ success: success });
    } else {
      success(this.model);
    }
  }
});

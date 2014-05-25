window.Yumblr.Views.IngredientEntryShow = Backbone.View.extend({
  initialize: function (options) {
    this.triggerForm = options.triggerForm;

    this.listenTo(this.model, 'sync', this.render);
  },
  className: "row ingredient-entry",
  template: JST["ingredient_entries/ingredient_entry_show"],
  formTemplate: JST["ingredient_entries/ingredient_entry_form"],
  events: {
    "click .edit-entry": "editEntry",
    "blur .entry-amount,.entry-rank,.fraction-select,.unit-select,.entry-ingredient": "saveEntry",
    // "change .entry-amount,.entry-rank,.fraction-select,.unit-select,.entry-ingredient": "saveEntry"
  },
  render: function () {
    var content = this.template({entry: this.model});
    this.$el.html(content);
    if (this.triggerForm) {
      this.editEntry();
    }
    return this;
  },
  editEntry: function () {
    var form = this.formTemplate({entry: this.model});
    this.$('.editable').html(form);
    this.$('.unit-select').val(this.model.get('unit'));
    this.$('.fraction-select').val(this.model.get('fraction'));
    this.$('.editable').focus();
  },
  saveEntry: function () {
    var attrs = {
      amount: this.$('.entry-amount').val(),
      rank: this.$('.entry-rank').val(),
      fraction: this.$('.fraction-select').val(),
      unit: this.$('.unit-select').val(),
      ingredient_name: this.$('.entry-ingredient').val(),
      recipe_id: this.model.recipe.id
    }

    var view = this;
    this.model.save({ingredient_entry: attrs}, {
      success: function (model) {
        view.triggerForm = false;
      }
    });
  }
});

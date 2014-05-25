window.Yumblr.Views.StepShow = Backbone.View.extend({
  className: "row recipe-step",
  initialize: function (options) {
    this.triggerForm = options.triggerForm;

    this.listenTo(this.model, "sync", this.render);
  },
  template: JST["steps/step_show"],
  formTemplate: JST["steps/step_show_form"],
  events: {
    "click .edit-step": "editStep",
    "blur .step-form": "saveStep",
    // "change .step-form": "saveStep"
  },
  render: function () {
    var content = this.template({step: this.model});
    this.$el.html(content);
    if (this.triggerForm) {
      this.editStep();
    }
    return this;
  },
  editStep: function (event) {
    var content = this.formTemplate({step: this.model});
    this.$(".step-body").html(content);
    this.$(".step-form").focus();
  },
  saveStep: function (event) {
    var body = $(event.target).val();
    this.model.set('recipe_id', this.model.recipe.id);
    var view = this;
    this.model.save({body: body}, {
      success: function (model) {
        view.triggerForm = false;
      }
    });
  }
})

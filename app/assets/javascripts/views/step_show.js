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
    "mouseleave .edit-component": "saveStep",
    "click .remove-item": "removeStep"
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
    this.$(".editable").html(content);
    this.$(".step-form").focus();
  },
  saveStep: function (event) {
    var attrs = {
      body: $(event.target).val(),
      recipe_id: this.model.recipe.id,
      rank: this.model.get('rank')
    }
    var view = this;
    if (attrs.body) {
      this.model.save({step: attrs}, {
        success: function (model) {
          view.triggerForm = false;
        }
      });
    }
  },
  removeStep: function () {
    var view = this;

    function success (model) {
      view.collection.remove(model);
      view.remove();
    }

    if (this.model.id) {
      this.model.destroy({ success: success });
    } else {
      success(this.model);
    }
  }
})

window.Yumblr.Views.StepForm = Backbone.View.extend({
  initialize: function (options) {
    this.parent = options.parent
  },
  className: "step-form row step-main recipe-step",
  template: JST["steps/step_form"],
  events: {
    "click .remove-item": "removeStep"
  },
  render: function () {
    var content = this.template({step: this.model});
    this.$el.html(content);
    return this;
  },
  removeStep: function () {
    this.remove();
    this.parent.saveRanks("#recipe-steps")
  }
});

window.Yumblr.Views.StepForm = Backbone.View.extend({
  initialize: function (options) {
    this.parent = options.parent;
    this.listenTo(this.model, "change sync", this.render);
  },
  className: "step-form row step-main recipe-step",
  template: JST["steps/step_form"],
  events: {
    "click .remove-item": "removeStep",
  },
  render: function () {
    var content = this.template({step: this.model});
    this.$el.html(content);
    return this;
  },
  removeStep: function () {
    if (this.parent.subviews()["#recipe-steps"].length > 1) {
      this.remove();
      this.parent.saveRanks("#recipe-steps", ".recipe-step")
      this.parent.removeSubview("#recipe-steps", this);
    }
  }
});

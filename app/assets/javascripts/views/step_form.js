window.Yumblr.Views.StepForm = Backbone.View.extend({
  tagName: "li",
  className: "step-form",
  template: JST["steps/step_form"],
  render: function () {
    var content = this.template({step: this.model});
    this.$el.html(content);
    return this;
  }
});

window.Yumblr.Views.StepForm = Backbone.View.extend({
  className: "step-form row",
  template: JST["steps/step_form"],
  render: function () {
    var content = this.template({step: this.model});
    this.$el.html(content);
    return this;
  }
});

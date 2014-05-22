window.Yumblr.Views.StepShow = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },
  template: JST["steps/step_show"],
  render: function () {
    var content = this.template({step: this.model});
    this.$el.html(content);
    return this;
  }
})

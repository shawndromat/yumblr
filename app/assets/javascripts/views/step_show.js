window.Yumblr.Views.StepShow = Backbone.View.extend({
  className: "row recipe-step",
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },
  template: JST["steps/step_show"],
  events: {
    "click .edit-step": "editStep",
    "blur .step-form": "saveStep",
    "change .step-form": "saveStep"
  },
  render: function () {
    var content = this.template({step: this.model});
    this.$el.html(content);
    return this;
  },
  editStep: function (event) {
    this.$(".step-body").html("<textarea class='step-form editable form-control'>" + this.model.escape("body") + "</textarea>");
    this.$(".step-form").focus();
  },
  saveStep: function (event) {
    var body = $(event.target).val();
    this.model.save({body: body})
  }
})

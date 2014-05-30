window.Yumblr.Views.TimerForm = Backbone.View.extend({
  initialize: function (options) {
    this.parent = options.parent;
  },
  className: "row timer-form",
  template: JST["steps/timer_form"],
  events: {
    "click .submit-timer": "submit",
    "click .remove-timer-form": "removeForm"
  },
  render: function () {
    var content = this.template({timer: parseInt(this.model.get("timer"))});
    this.$el.html(content);
    return this;
  },
  submit: function (event) {
    var time = parseInt(this.$(".seconds").val());
    time += parseInt(this.$(".minutes").val() * 60);
    time += parseInt(this.$(".hours").val() * 3600);
    var view = this;
    this.model.save({step: {timer: time}},{
      success: function () {
        view.parent.removeSubview(".timer-form-wrapper", view);
        view.parent.render();
      }
    });
  },
  removeForm: function () {
    this.parent.removeSubview(".timer-form-wrapper", this);
    this.parent.render();
  }
});

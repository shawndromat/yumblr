window.Yumblr.Views.TimerForm = Backbone.View.extend({
  initialize: function (options) {
    this.parent = options.parent;
  },
  className: "row",
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
        view.parent.removeSubview(".timer-form", view);
      }
    });
  },
  removeForm: function () {
    this.parent.removeSubview(".timer-form", this);
    this.parent.render();
  }
  // deleteTimer: function (event) {
  //   event.preventDefault();
  //   this.model.set("timer", null);
  //   var view = this;
  //   this.model.save({},{
  //     success: function () {
  //       view.parent.removeSubview(".timer-form", view);
  //     }
  //   });
  // }
});

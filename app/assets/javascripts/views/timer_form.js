window.Yumblr.Views.TimerForm = Backbone.View.extend({
  initialize: function (options) {
    this.parent = options.parent;
  },
  className: "row",
  template: JST["steps/timer_form"],
  events: {
    "click .submit-timer": "submit"
  },
  render: function () {
    var content = this.template({timer: parseInt(this.model.get("timer"))});
    this.$el.html(content);
    return this;
  },
  submit: function (event) {
    console.log("save");
    var time = parseInt(this.$(".seconds").val());
    time += parseInt(this.$(".minutes").val() * 60);
    time += parseInt(this.$(".hours").val() * 3600);
    this.model.set("timer", time);
    var view = this;
    this.model.save({},{
      success: function () {
        view.parent.triggerForm = false;
      }
    })
  }
});

window.Yumblr.Views.TimerShow = Backbone.View.extend({
  initialize: function (options) {
    this.listenTo(this.model, "change sync", this.render);
    this.parent = options.parent;
  },
  template: JST["steps/step_timer"],
  events: {
    "click .restart-timer": "restartTimer",
    "click .play-button": "toggleTimer",
    "click .delete-timer": "deleteTimer"
  },
  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.$timer = this.$(".timer-" + this.model.id).first();
    setTimeout(this.startTimer.bind(this), 500);
    return this;
  },
  startTimer: function () {
    var time = parseInt(this.model.escape("timer"));
    var view = this;
    this.$timer.countdown({
      until: +time,
      compact: true,
      description: "",
      onExpiry: view.expireTimer.bind(view)
    });
    this.$timer.countdown("pause");
  },
  restartTimer: function () {
    this.$timer.countdown("destroy");
    this.startTimer();
    this.$(".play-button span").removeClass("glyphicon-pause");
    this.$(".play-button span").addClass("glyphicon-play");
    this.$(".timer-cover").css("visibility", "hidden");
    this.$(".timer-cover").removeClass("flash");
  },
  expireTimer: function () {
    this.$(".timer-cover").css("visibility", "visible");
    this.$(".timer-message").addClass("flash");
    this.$(".play-button span").removeClass("glyphicon-pause");
    this.$(".play-button span").addClass("glyphicon-play");
  },
  toggleTimer: function (event) {
    this.$timer.countdown("toggle");
    var $glyph = this.$('.play-button span');
    $glyph.toggleClass("glyphicon-pause");
    $glyph.toggleClass("glyphicon-play");
  },
  deleteTimer: function (event) {
    this.$timer.countdown("destroy");
    this.model.save({step: {timer: null}})
  }
});

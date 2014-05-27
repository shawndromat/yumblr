window.Yumblr.Views.TimerShow = Backbone.View.extend({
  template: JST["steps/step_timer"],
  events: {
    "click .close-timer": "showHideTimer",
    "click .restart-timer": "restartTimer",
    "click .play-button": "toggleTimer"
  },
  render: function () {
    var content = this.template();
    this.$el.html(content);
    if (!this.$timer) {
      this.$timer = this.$(".step-timer").first();
    }
    setTimeout(this.startTimer.bind(this), 100);
    return this;
  },
  showHideTimer: function () {
    this.remove();
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
    this.$(".timer-cover").removeClass("flash");
  },
  expireTimer: function () {
    this.$(".timer-cover").addClass("flash");
    this.$(".play-button span").removeClass("glyphicon-pause");
    this.$(".play-button span").addClass("glyphicon-play");
  },
  toggleTimer: function (event) {
    this.$timer.countdown("toggle");
    var $glyph = this.$('.play-button span');
    $glyph.toggleClass("glyphicon-pause");
    $glyph.toggleClass("glyphicon-play");
  }
});

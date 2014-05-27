window.Yumblr.Views.VideoForm = Backbone.View.extend({
  initialize: function (options) {
    this.parent = options.parent;
  },
  className: "row",
  template: JST["steps/video_form"],
  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});

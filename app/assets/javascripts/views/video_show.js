window.Yumblr.Views.VideoShow = Backbone.View.extend({
  initialize: function (options) {
    this.parent = options.parent
  },
  className: "step-video",
  template: JST["steps/video_show"],
  render: function () {
    var content = this.template({step: this.model});
    this.$el.html(content);
    return this;
  },
  events: {
    "click .remove-item": "deleteVideo"
  },
  deleteVideo: function () {
    this.model.save({step: {video_url: null}});
    this.parent.removeSubview(".step-video-wrapper", this)
  }
})

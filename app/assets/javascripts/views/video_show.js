window.Yumblr.Views.VideoShow = Backbone.View.extend({
  initialize: function (options) {
    this.parent = options.parent;
    this.listenTo(this.model, "change:video_url change:video_id", this.render)
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
    this.model.save({step: {video_url: null, video_id: null}});
    this.parent.removeSubview(".step-video-wrapper", this)
  }
})

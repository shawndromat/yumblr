window.Yumblr.Views.VideoForm = Backbone.View.extend({
  initialize: function (options) {
    this.parent = options.parent;
  },
  className: "row video-form",
  template: JST["steps/video_form"],
  events: {
    "click .save-item": "submit",
    "click .remove-item": "remove"
  },
  render: function () {
    var content = this.template({step: this.model});
    this.$el.html(content);
    return this;
  },
  submit: function (event) {
    var videoUrl = this.$(".video-input").val();
    var videoId;
    if (videoUrl.indexOf("youtube") >= 0) {
      var splits = videoUrl.split(/\?|&/)
      var vidSplit = _.find(splits, function (split) {
        if (split.substr(0, 2) === "v=") {
          return split
        }
      })
      videoId = vidSplit.split("=")[1];
    } else if (videoUrl.indexOf("youtu.be") >= 0){
      videoUrl = videoUrl.substr(videoUrl.indexOf("youtu.be"));
      videoId = videoUrl.split(/\/|\?/)[1]
    }
    var view = this;
    this.model.set("video_url", videoId);
    this.model.save({step: {video_url: videoId}},{
      success: function () {
        view.parent.removeSubview(".video-form-wrapper", view);
      }
    });
  },
  removeForm: function () {
    this.parent.removeSubview(".video-form-wrapper", this);
    this.parent.render();
  }
});

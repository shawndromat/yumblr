window.Yumblr.Views.VideoForm = Backbone.View.extend({
  initialize: function (options) {
    this.parent = options.parent;
  },
  className: "row",
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
    var video_url = this.$(".video-input").val();
    var video_id = video_url.split("=")[1];
    var view = this;
    this.model.save({step: {video_url: video_id}},{
      success: function () {
        view.parent.removeSubview(".video-form", view);
      }
    });
  },
  removeForm: function () {
    this.parent.removeSubview(".video-form", this);
    this.parent.render();
  }
});

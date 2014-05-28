window.Yumblr.Views.StepShow = Backbone.CompositeView.extend({
  className: "row recipe-step",
  initialize: function (options) {
    this.triggerForm = options.triggerForm;
    if (this.model.get("timer")) {
      this.addTimer();
    }
    this.listenTo(this.model, "change:timer", this.toggleTimerView)
    this.listenTo(this.model, "sync", this.render);
  },
  template: JST["steps/step_show"],
  formTemplate: JST["steps/step_show_form"],
  events: {
    "click .edit-button": "editStep",
    "click .save-item": "saveStep",
    "click .remove-step": "removeStep",
    "click .show-timer": "addTimer",
    "click .add-timer": "addTimerForm"
  },
  render: function () {
    $(this.el).attr("data-step-id", this.model.id);
    var content = this.template({step: this.model});
    this.$el.html(content);
    if (this.triggerForm) {
      this.editStep();
    }
    this.attachSubviews();

    return this;
  },
  editStep: function (event) {
    var content = this.formTemplate({step: this.model});
    this.$el.html(content);
    this.$(".step-form").focus();
    this.$(".edit-button").hide();
  },
  saveStep: function (event) {
    var attrs = {
      body: this.$(".step-form").val(),
      recipe_id: this.model.recipe.id,
      rank: this.model.get("rank")
    }
    var view = this;
    if (attrs.body) {
      this.model.save({step: attrs}, {
        success: function (model) {
          view.triggerForm = false;
        }
      });
    }
  },
  removeStep: function () {
    var view = this;

    function success (model) {
      view.collection.remove(model);
      view.remove();
    }

    if (this.model.id) {
      this.model.destroy({ success: success });
    } else {
      success(this.model);
    }
  },
  addTimer: function () {
    if (this.isEmpty(".step-timer-wrapper")) {
      var timerShow = new Yumblr.Views.TimerShow({
        model: this.model,
        parent: this
      });
      this.addSubview(".step-timer-wrapper", timerShow);
    }
    this.render();
  },
  addTimerForm: function (event) {
    event.preventDefault();
    if (this.isEmpty(".timer-form")) {
      var timerForm = new Yumblr.Views.TimerForm({
        model: this.model,
        parent: this
      });
      this.addSubview(".timer-form", timerForm);
    }
    this.render();
  },
  addVideo: function () {
    if (this.isEmpty(".step-video-wrapper")) {
      var videoShow = new Yumblr.Views.VideoShow({model: this.model});
      this.addSubview(".step-video-wrapper", videoShow);
    }
    this.render();
  },
  addVideoForm: function (event) {
    event.preventDefault();
    if (this.isEmpty(".video-form")) {
      var videoForm = new Yumblr.Views.VideoForm({
        model: this.model,
        parent: this
      });
      this.addSubview(".video-form", videoForm)
    }
    this.triggerForm = true;
    this.render();
  },
  toggleTimerView: function () {
    if (this.model.get("timer")) {
      this.addTimer();
    } else {
      this.clearSubviews(".step-timer-wrapper");
      this.render();
    }
  },
  toggleVideoView: function () {
    if (this.model.get("video")) {
      this.addVideo();
    } else {
      this.clearSubviews(".step-video-wrapper");
      this.render();
    }
  }
})

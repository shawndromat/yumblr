window.Yumblr.Views.StepShow = Backbone.CompositeView.extend({
  className: "row recipe-step",
  initialize: function (options) {
    this.triggerForm = options.triggerForm;
    this.parent = options.parent;

    if (this.model.get("timer")) {
      this.addTimer();
    }

    if (this.model.get("video_url")) {
      this.addVideo();
    }
    this.listenTo(this.model, "change:video_url", this.toggleVideoView);
    this.listenTo(this.model, "change:timer", this.toggleTimerView);
    this.listenTo(this.model, "sync change:rank", this.render);
  },
  template: JST["steps/step_show"],
  formTemplate: JST["steps/step_show_form"],
  events: {
    "click .edit-button": "editStep",
    "click .save-item": "saveStep",
    "click .remove-step": "removeStep",
    "click .add-timer": "addTimerForm",
    "click .add-video": "addVideoForm"
  },
  render: function () {
    $(this.el).attr("data-step-id", this.model.id);
    var content = this.template({
      step: this.model,
      recipe: this.parent.model
    });
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
      rank: this.model.get("rank"),
    }
    var view = this;
    if (attrs.body) {
      this.model.save({step: attrs}, {
        success: function (model) {
          view.triggerForm = false;
        },
        error: function (response) {
          console.log(response);
        }
      });
    } else {
      $.bootstrapGrowl("Step body can't be blank", {
        ele: this.$(".step-edit-buttons"),
        type: "info",
        offset: {from: "top", amount: -80},
        align: "right",
        width: 200,
        delay: 2000,
        allow_dismiss: true,
        stackup_spacing: 10
      });
    }
  },
  removeStep: function () {
    var view = this;

    function success (model) {
      view.remove();
      view.parent.saveRanks("#recipe-steps", ".recipe-step")
      view.parent.removeSubview("#recipe-steps", view);
      view.collection.remove(model);
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
    if (this.isEmpty(".timer-form-wrapper")) {
      var timerForm = new Yumblr.Views.TimerForm({
        model: this.model,
        parent: this
      });
      this.addSubview(".timer-form-wrapper", timerForm);
    }
    this.render();
  },
  addVideo: function () {
    if (this.isEmpty(".step-video-wrapper")) {
      var videoShow = new Yumblr.Views.VideoShow({
        model: this.model,
        parent: this
      });
      this.addSubview(".step-video-wrapper", videoShow);
    }
    this.render();
  },
  addVideoForm: function (event) {
    event.preventDefault();
    if (this.isEmpty(".video-form-wrapper")) {
      var videoForm = new Yumblr.Views.VideoForm({
        model: this.model,
        parent: this
      });
      this.addSubview(".video-form-wrapper", videoForm)
    }
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
    if (this.model.get("video_url")) {
      this.addVideo();
    } else {
      this.clearSubviews(".step-video-wrapper");
      this.render();
    }
  },
})

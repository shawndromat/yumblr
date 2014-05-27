window.Yumblr.Views.StepShow = Backbone.CompositeView.extend({
  className: "row recipe-step",
  initialize: function (options) {
    this.triggerForm = options.triggerForm;
    this.listenTo(this.model, "sync", this.render);
  },
  template: JST["steps/step_show"],
  formTemplate: JST["steps/step_show_form"],
  events: {
    "click .edit-step": "editStep",
    // "mouseleave .recipe-step": "saveStep",
    "click .remove-item": "removeStep",
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
    this.$(".editable").html(content);
    this.$(".step-form").focus();
    this.$(".edit-button").hide();
  },
  saveStep: function (event) {
    var attrs = {
      body: $(event.target).val(),
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
    if (!this.subviews()[".step-timer-wrapper"]) {
      var timerShow = new Yumblr.Views.TimerShow({model: this.model});
      this.addSubview(".step-timer-wrapper", timerShow);
    }
    this.render();
  },
  addTimerForm: function (event) {
    event.preventDefault();
    if (!this.subviews()[".timer-form"]) {
      var timerForm = new Yumblr.Views.TimerForm({
        model: this.model,
        parent: this
      });
      this.addSubview(".timer-form", timerForm);
    }
    this.triggerForm = true;
    this.render();
  },
  addVideo: function () {
    if (!this.subviews()[".step-video-wrapper"]) {
      var videoShow = new Yumblr.Views.VideoShow({model: this.model});
      this.addSubview(".step-video-wrapper", videoShow);
    }
    this.render();
  },
  addVideoForm: function (event) {
    event.preventDefault();
    if (!this.subviews()[".video-form"]) {
      var videoForm = new Yumblr.Views.VideoForm({
        model: this.model,
        parent: this
      });
      this.addSubview(".video-form", videoForm)
    }
    this.triggerForm = true;
    this.render();
  }
})

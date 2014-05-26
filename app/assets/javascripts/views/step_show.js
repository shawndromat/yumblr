window.Yumblr.Views.StepShow = Backbone.View.extend({
  className: "row recipe-step",
  initialize: function (options) {
    this.triggerForm = options.triggerForm;
    this.listenTo(this.model, "sync", this.render);
  },
  template: JST["steps/step_show"],
  formTemplate: JST["steps/step_show_form"],
  events: {
    "click .edit-step": "editStep",
    "mouseleave .edit-component": "saveStep",
    "click .remove-item": "removeStep",
    "click .glyphicon-time": "addTimer",
    "click .close-timer": "showHideTimer",
    "click .restart-timer": "restartTimer"
  },
  render: function () {
    $(this.el).attr("data-step-id", this.model.id);
    var content = this.template({step: this.model});
    this.$el.html(content);
    if (this.triggerForm) {
      this.editStep();
    }
    return this;
  },
  editStep: function (event) {
    var content = this.formTemplate({step: this.model});
    this.$(".editable").html(content);
    this.$(".step-form").focus();
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
    var timerTemplate = JST["steps/step_timer"];
    var content = timerTemplate();
    this.$(".step-timer-wrapper").html( content );
    this.$timer = this.$(".step-timer")
    this.startTimer();

    var view = this;
    this.$(".play-button").click(function () {
      view.$timer.countdown("toggle");
      var $glyph = $(this).find(".glyphicon")
      $glyph.toggleClass("glyphicon-pause");
      $glyph.toggleClass("glyphicon-play");
    })
  },
  showHideTimer: function () {
    this.$(".step-timer-wrapper").empty();
  },
  startTimer: function () {
    var time = parseInt(this.model.escape("timer"));
    var view = this;
    this.$timer.countdown({
      until: +5,
      compact: true,
      description: "",
      onExpiry: view.expireTimer.bind(view)
    });
    this.$timer.countdown("pause");
  },
  restartTimer: function () {
    this.$(".timer-cover").removeClass("flash");
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
  }
})

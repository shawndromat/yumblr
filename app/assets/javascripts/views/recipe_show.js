window.Yumblr.Views.RecipeShow = Backbone.CompositeView.extend({
  className: "recipe-show col-md-12 col-lg-12",
  initialize: function () {
    this.listenTo(this.model, "sync change", this.render);
    this.listenTo(this.model.steps(), "add", this.addStep);
    this.listenTo(this.model.steps(), "reset", this.render);
    this.listenTo(this.model.entries(), "add", this.addEntry);
    this.listenTo(this.model.entries(), "sync change remove", this.render);

    var view = this;
    this.model.steps().each( function (step) {
      view.addStep(step)
    });
    this.model.entries().each( function (entry) {
      view.addEntry(entry)
    });
  },
  template: JST["recipes/recipe_show"],
  photoTemplate: JST["recipes/photo_form"],
  events: {
    "click .edit-title": "editTitle",
    "click .save-title": "saveTitle",
    "click .add-step": "addStepForm",
    "click .add-entry": "addEntryForm",
    "click .edit-photo": "editPhoto",
    "click .save-photo": "savePhoto",
    "sortupdate #ingredient-entries": "saveEntriesRank",
    "sortupdate #recipe-steps": "saveStepsRank"
  },
  render: function () {
    var content = this.template({recipe: this.model});
    this.$el.html(content);
    this.sortSubviews("#ingredient-entries", "rank");
    this.sortSubviews("#recipe-steps", "rank");
    this.attachSubviews();
    if (this.model.steps().length > 0) {
      this.$(".add-step").addClass("mobile");
    }
    if (this.model.entries().length > 0) {
      this.$(".add-entry").addClass("mobile");
    }
    $("#recipe-steps").sortable();
    $("#ingredient-entries").sortable();
    return this;
  },
  addStep: function (step) {
    var trigger = step.id ? false : true;
    var stepShow = new Yumblr.Views.StepShow({
      model: step,
      collection: this.model.steps(),
      triggerForm: trigger,
      parent: this
    });
    this.addSubview("#recipe-steps", stepShow);
  },
  addEntry: function (entry) {
    var trigger = entry.id ? false : true;
    var entryShow = new Yumblr.Views.IngredientEntryShow({
      model: entry,
      collection: this.model.entries(),
      triggerForm: trigger,
      parent: this
    });
    this.addSubview("#ingredient-entries", entryShow);
  },
  addStepForm: function () {
    var rank = this.$("#recipe-steps").children().length + 1;
    var step = new Yumblr.Models.Step({
      rank: rank,
      recipe: this.model});
    this.model.steps().add(step);
  },
  addEntryForm: function () {
    var rank = this.$("#ingredient-entries").children().length + 1;
    var entry = new Yumblr.Models.IngredientEntry({
      rank: rank,
      recipe: this.model
    });
    this.model.entries().add(entry);
  },
  editTitle: function () {
    var titleForm = JST["recipes/title_form"]
    var title = titleForm({recipe: this.model})
    $(".title-card").html(title);
    this.$(".title-form").focus();
  },
  saveTitle: function (event) {
    var title = this.$(".title-form").val();
    this.model.save({title: title});
  },
  editPhoto: function (event) {
    var content = this.photoTemplate({recipe: this.model});
    this.$("#recipe-show-img").html(content);
    this.$("#photo-input").focus();
  },
  savePhoto: function (event) {
    var photoUrl = this.$("#photo-input").val();
    this.model.save({recipe: {photo_url: photoUrl}})
  },
  saveEntriesRank: function (event, ui) {
    this.saveRanks("#ingredient-entries", ".ingredient-entry");
  },
  saveStepsRank: function () {
    this.saveRanks("#recipe-steps", ".recipe-step")
  }
});

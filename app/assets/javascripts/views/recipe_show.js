window.Yumblr.Views.RecipeShow = Backbone.CompositeView.extend({
  className: "recipe-show",
  initialize: function () {
    this.listenTo(this.model, "sync change", this.render);
    this.listenTo(this.model.steps(), "add", this.addStep);
    this.listenTo(this.model.steps(), "sync change", this.render);
    this.listenTo(this.model.steps(), "remove", this.removeStep);
    this.listenTo(this.model.entries(), "add", this.addEntry);
    this.listenTo(this.model.entries(), "sync change remove", this.render);
    this.listenTo(this.model.entries(), "remove", this.removeEntry);

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
    "blur .recipe-title": "saveTitle",
    "change .recipe-title": "saveTitle",
    "click .add-step": "addStepForm",
    "click .add-entry": "addEntryForm",
    "click .edit-photo": "editPhoto",
    "blur #photo-input": "savePhoto"
  },
  render: function () {
    var content = this.template({recipe: this.model});
    this.$el.html(content);
    this.sortSubviews("#ingredient-entries", "rank");
    this.sortSubviews("#recipe-steps", "rank");
    this.attachSubviews();
    return this;
  },
  addStep: function (step) {
    var trigger = step.id ? false : true;
    var stepShow = new Yumblr.Views.StepShow({
      model: step,
      collection: this.model.steps(),
      triggerForm: trigger
    });
    this.addSubview("#recipe-steps", stepShow);
  },
  addEntry: function (entry) {
    var trigger = entry.id ? false : true;
    var entryShow = new Yumblr.Views.IngredientEntryShow({
      model: entry,
      collection: this.model.entries(),
      triggerForm: trigger
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
    $(".recipe-title").html(title);
    this.$(".title-form").focus();
  },
  saveTitle: function (event) {
    var title = $(event.target).val();
    this.model.save({title: title});
  },
  editPhoto: function (event) {
    var content = this.photoTemplate({recipe: this.model});
    this.$('#recipe-show-img').html(content);
    this.$('#photo-input').focus();
  },
  savePhoto: function (event) {
    var photoUrl = $(event.target).val();
    this.model.save({photo_url: photoUrl})
  },
  removeStep: function (step) {
    var subview = _.find(
      this.subviews()["#recipe-steps"],
      function (subview) {
        return subview.model === step;
      }
    );

    this.removeSubview("#recipe-steps", subview);
  },
  removeEntry: function (entry) {
    var subview = _.find(
      this.subviews()["#ingredient-entries"],
      function (subview) {
        return subview.model === entry;
      }
    );

    this.removeSubview("#ingredient-entries", subview);
  },
});

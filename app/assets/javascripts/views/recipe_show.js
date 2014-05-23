window.Yumblr.Views.RecipeShow = Backbone.CompositeView.extend({
  className: "recipe-show",
  initialize: function () {
    this.listenTo(this.model, "sync change", this.render);
    this.listenTo(this.model.steps(), "add", this.addStep);
    this.listenTo(this.model.steps(), "sync change", this.render);
    this.listenTo(this.model.entries(), "add", this.addEntry);
    this.listenTo(this.model.entries(), "sync change", this.render);

    var view = this;
    this.model.steps().each( function (step) {
      view.addStep.bind(view, step)
    });
    this.model.entries().each( function (entry) {
      view.addEntry.bind(view, entry)
    });
  },
  template: JST["recipes/recipe_show"],
  events: {
    "click .edit-title": "editTitle",
    "blur .recipe-title": "saveTitle",
    "change .recipe-title": "saveTitle",
  },
  render: function () {
    var content = this.template({recipe: this.model});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },
  addStep: function (step) {
    var stepShow = new Yumblr.Views.StepShow({model: step});
    this.addSubview("#recipe-steps", stepShow);
  },
  addEntry: function (entry) {
    var entryShow = new Yumblr.Views.IngredientEntryShow({model: entry});
    this.addSubview("#ingredient-entries", entryShow);
  },
  editTitle: function () {
    var titleForm = JST["recipes/title_form"]
    var title = titleForm({recipe: this.model})
    $('.recipe-title').html(title);
    this.$('.title-form').focus();
  },
  saveTitle: function (event) {
    var title = $(event.target).val();
    this.model.save({title: title});
  },
});

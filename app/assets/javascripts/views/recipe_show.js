window.Yumblr.Views.RecipeShow = Backbone.CompositeView.extend({
  className: "recipe-show",
  initialize: function () {
    this.listenTo(this.model, "sync change", this.render);
    this.listenTo(this.model.steps(), "add", this.addStep);
    this.listenTo(this.model.steps(), "sync change", this.render);
    var view = this;
    this.model.steps().each(function (step) {
      this.addStep.bind(view, step);
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
  editTitle: function () {
    $('.recipe-title').html("<input class='title-form editable' value='" + this.model.escape('title') + "'></input>")
  },
  saveTitle: function (event) {
    console.log("saved");
    var title = $(event.target).val();
    this.model.save({title: title});
  },
});

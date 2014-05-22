window.Yumblr.Views.RecipeShow = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.model, "sync change", this.render);
    this.listenTo(this.model.steps(), "add", this.addStep);
    this.listenTo(this.model.steps(), "sync change", this.render);
    // this.model.steps().each(function (step) {
    //   this.addStep.bind(this, step);
    // });
  },
  template: JST["recipes/recipe_show"],
  render: function () {
    var content = this.template({recipe: this.model});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },
  addStep: function (step) {
    var stepShow = new Yumblr.Views.StepShow({model: step});
    this.addSubview("#recipe-steps", stepShow);
  }
});

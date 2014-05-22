window.Yumblr.Views.RecipeForm = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);

    _(3).times(this.addStep.bind(this))
  },
  className: "row col-lg-8 col-lg-offset-2",
  template: JST["recipes/recipe_form"],
  events: {
    "submit form": "submit"
  },
  render: function () {
    var content = this.template({recipe: this.model});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },
  submit: function (event) {
    event.preventDefault();
    var formData = $(event.target).serializeJSON();
    var attrs = formData["recipe"];
    var steps = formData["steps"];
    // this.model.set(attrs);

    function success (model) {
      Backbone.history.navigate("recipes/" + model.id, {trigger: true})
      if (model.isNew()) {
        Yumblr.recipes.add(model)
      }
    }

    this.model.save({recipe: attrs, steps: steps}, {
      success: success
    })
  },
  addStep: function () {
    var step = new Yumblr.Models.Step();
    if (this.subviews()["#steps-forms"]) {
      step.set("rank", this.subviews()["#steps-forms"].length + 1)
    } else {
      step.set("rank", 1);
    }
    var stepForm = new Yumblr.Views.StepForm({model: step});
    this.addSubview("#steps-forms", stepForm);
    // step.set('rank', this.subviews()["#steps-forms"].length + 1);
  }
});

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
    console.log(attrs);
    console.log(steps);
    this.model.set(attrs);

    function success (model) {
      Backbone.history.navigate("recipes/" + model.id, {trigger: true})
    }

    if (this.model.isNew()) {
      this.collection.create(this.model, {
        success: success
      });
    } else {
      this.model.save({}, {
        success: success
      });
    }
  },
  addStep: function () {
    var step = new Yumblr.Models.Step();
    var stepForm = new Yumblr.Views.StepForm({model: step});
    this.addSubview("#steps-forms", stepForm);
  }
});

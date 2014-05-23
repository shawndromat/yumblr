window.Yumblr.Views.RecipeForm = Backbone.CompositeView.extend({
  initialize: function () {
    // var ingredientForm = new Yumblr.Views.IngredientEntryForm();
    // this.addSubview("#ingredient-entries", ingredientForm);
    this.addStepForm();
  },
  template: JST["recipes/recipe_form"],
  events: {
    "click .recipe-title": "editTitle",
    "click .add-step": "addStepForm",
  },
  render: function () {
    var content = this.template({recipe: this.model});
    this.$el.html(content);
    this.attachSubviews();
    setTimeout(function () {
      $('.title-input').focus().val("Recipe Title");
    }, 100);
    this.$('#recipe-steps').sortable();
    return this;
  },
  addStepForm: function () {
    var rank = this.$(".step-form").length + 1;
    var step = new Yumblr.Models.Step({rank: rank});
    var stepForm = new Yumblr.Views.StepForm({model: step});
    this.addSubview("#recipe-steps", stepForm);
  },

  // initialize: function () {
  //   this.listenTo(this.model, 'sync', this.render);
  //   this.listenTo(this.model.steps(), 'change', this.render);
  //   if (this.model.steps().length > 0) {
  //     this.model.steps().each(this.addStep.bind(this));
  //   } else {
  //     this.stepSetup();
  //   }
  // },
  // className: "row col-lg-8 col-lg-offset-2",
  // template: JST["recipes/recipe_form"],
  // events: {
  //   "blur #recipe-title": "submitRecipe",
  //   "submit form": "submit"
  // },
  // render: function () {
  //   var content = this.template({recipe: this.model});
  //   this.$el.html(content);
  //   this.attachSubviews();
  //   return this;
  // },
  // submit: function (event) {
  //   event.preventDefault();
  //   var formData = $(event.target).serializeJSON();
  //   var attrs = formData["recipe"];
  //   var steps = formData["steps"];
  //   function success (model) {
  //     if (model.isNew()) {
  //       Yumblr.recipes.add(model)
  //     }
  //     Backbone.history.navigate("recipes/" + model.id, {trigger: true})
  //   }
  //   if (this.model.isNew()) {
  //     this.model.save({recipe: attrs, steps: steps}, {
  //       success: success
  //     })
  //   } else {
  //     attrs["steps"] = steps;
  //     this.model.save({recipe: attrs},{
  //       success: success
  //     });
  //   }
  // },
  // stepSetup: function () {
  //   var view = this;
  //   _(3).times(function () {
  //     var stepViews = view.subviews()["#steps-forms"];
  //     var rank = stepViews ? stepViews.length + 1 : 1;
  //     var step = new Yumblr.Models.Step({rank: rank}, {recipe: this.model});
  //     view.addStep(step)
  //   })
  // },
  // addStep: function (step) {
  //   var stepForm = new Yumblr.Views.StepForm({model: step});
  //   this.addSubview("#steps-forms", stepForm);
  // }
});

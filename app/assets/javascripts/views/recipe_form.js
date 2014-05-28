window.Yumblr.Views.RecipeForm = Backbone.CompositeView.extend({
  initialize: function () {
    this.addEntryForm();
    this.addStepForm();
  },
  className: "recipe-form",
  template: JST["recipes/recipe_form"],
  photoTemplate: JST["recipes/photo_form"],
  events: {
    "click .add-step": "addStepForm",
    "click .add-entry": "addEntryForm",
    "sortupdate #recipe-steps": "updateSteps",
    "submit form": "submit"
  },
  render: function () {
    var content = this.template({recipe: this.model});
    this.$el.html(content);
    this.attachSubviews();
    // later feature
    // this.$('#recipe-steps').sortable();
    // this.$('#ingredient-entries').sortable();
    return this;
  },
  addStepForm: function () {
    var rank = this.$(".step-form").length + 1;
    var step = new Yumblr.Models.Step({rank: rank, recipe: this.model});
    var stepForm = new Yumblr.Views.StepForm({
      model: step,
      parent: this
    });
    this.addSubview("#recipe-steps", stepForm);
  },
  addEntryForm: function () {
    var rank = this.$(".entry-form").length + 1;
    var entry = new Yumblr.Models.IngredientEntry({rank: rank});
    var ingredientForm = new Yumblr.Views.IngredientEntryForm({model: entry});
    this.addSubview("#new-ingredients", ingredientForm);
  },
  submit: function (event) {
    event.preventDefault();
    var formData = $(event.target).serializeJSON();
    this.model.set(formData);
    this.model.save({},{
      success: function (model) {
        if (model.isNew()) {
          Yumblr.recipes.add(model);
          Yumblr.currentUserRecipes.add(model);
        }
        Backbone.history.navigate("recipes/" + model.id, {trigger: true})
      }
    })
  }
});

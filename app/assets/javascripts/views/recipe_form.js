window.Yumblr.Views.RecipeForm = Backbone.CompositeView.extend({
  initialize: function () {
    this.addEntryForm();
    this.addStepForm();
  },
  template: JST["recipes/recipe_form"],
  events: {
    "click .recipe-title": "editTitle",
    "click .add-step": "addStepForm",
    "click .add-entry": "addEntryForm",
    "sortupdate #recipe-steps": "updateSteps",
    "submit form": "submit"
  },
  render: function () {
    var content = this.template({recipe: this.model});
    this.$el.html(content);
    this.attachSubviews();
    setTimeout(function () {
      $('.title-input').focus().val("Recipe Title");
    }, 100);
    // later feature
    // this.$('#recipe-steps').sortable();
    // this.$('#ingredient-entries').sortable();
    return this;
  },
  addStepForm: function () {
    var rank = this.$(".step-form").length + 1;
    var step = new Yumblr.Models.Step({rank: rank, recipe: this.model});
    var stepForm = new Yumblr.Views.StepForm({model: step});
    this.addSubview("#recipe-steps", stepForm);
  },
  addEntryForm: function () {
    var rank = this.$(".entry-form").length + 1;
    var entry = new Yumblr.Models.IngredientEntry({rank: rank});
    var ingredientForm = new Yumblr.Views.IngredientEntryForm({model: entry});
    this.addSubview("#ingredient-entries", ingredientForm);
  },
  submit: function (event) {
    event.preventDefault();
    var formData = $(event.target).serializeJSON();
    this.model.set(formData);
    this.model.save({},{
      success: function (model) {
        if (model.isNew()) {
          Yumblr.recipes.add(model);
        }
        Backbone.history.navigate("recipes/" + model.id, {trigger: true})
      }
    })
  },
});

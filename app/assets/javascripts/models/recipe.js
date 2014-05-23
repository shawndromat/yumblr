window.Yumblr.Models.Recipe = Backbone.Model.extend({
  urlRoot: "/api/recipes",
  steps: function () {
    if (!this._steps) {
      this._steps = new Yumblr.Collections.RecipeSteps([], {recipe: this})
    }
    return this._steps;
  },
  entries: function () {
    if (!this._entries) {
      this._entries = new Yumblr.Collections.IngredientEntries([], {recipe: this})
    }
    return this._entries;
  },
  parse: function (response) {
    if (response["steps"]) {
      this.steps().set(response["steps"], {parse: true});
      delete response["steps"];
    }
    if (response["ingredient_entries"]) {
      this.entries().set(response["ingredient_entries"], {parse: true});
      delete response["ingredient_entries"]
    }
    return response;
  }
});

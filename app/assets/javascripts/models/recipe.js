window.Yumblr.Models.Recipe = Backbone.Model.extend({
  urlRoot: "/api/recipes",
  steps: function () {
    if (!this._steps) {
      this._steps = new Yumblr.Collections.RecipeSteps([], {recipe: this})
    }
    return this._steps;
  },
  parse: function (response) {
    if (response.steps) {
      this.steps().set(response.steps);
      delete response.steps;
    }
    return response;
  }
});

window.Yumblr.Collections.SearchRecipes = Backbone.Collection.extend({
  url: "/api/recipes/search",
  model: Yumblr.Models.Recipe
})

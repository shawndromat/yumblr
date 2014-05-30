window.Yumblr.Collections.PrivateRecipes = Backbone.Collection.extend({
  model: Yumblr.Models.Recipe,
  url: "/api/recipes/private"
})

window.Yumblr.Views.RecipeSearch = Backbone.CompositeView.extend({
  initialize: function () {
    this.results = new Yumblr.Collections.SearchRecipes();
    this.listenTo(this.collection, "sync", this.parseIngredients);
    this.listenTo(this.results, "sync", this.handleResults)
  },
  template: JST["recipes/recipe_search"],
  events: {
    "submit form": "submit"
  },
  render: function () {
    var content = this.template();
    this.$el.html(content);
    var view = this;
    $('#search .typeahead').typeahead({
      hint: true,
      highlight: true,
      minLength: 1
    },
    {
      name: 'ingredients',
      displayKey: 'value',
      source: view.substringMatcher(view.ingredients)
    });
    return this;
  },
  substringMatcher: function(strs) {
    return function findMatches(q, cb) {
      var matches, substringRegex;

      // an array that will be populated with substring matches
      matches = [];

      // regex used to determine if a string contains the substring `q`
      substrRegex = new RegExp(q, 'i');

      // iterate through the pool of strings and for any string that
      // contains the substring `q`, add it to the `matches` array
      $.each(strs, function(i, str) {
        if (substrRegex.test(str)) {
          // the typeahead jQuery plugin expects suggestions to a
          // JavaScript object, refer to typeahead docs for more info
          matches.push({ value: str });
        }
      });

      cb(matches);
    }
  },
  parseIngredients: function () {
    this.ingredients = this.collection.pluck("name");
    this.render();
  },
  submit: function (event) {
    event.preventDefault();
    var searchTerm = $(event.target).find(".tt-input").val();
    this.results.fetch({data: {ingredient_name: searchTerm}});
  },
  handleResults: function () {
    if (this.results.models.length > 0) {
      this.$("#search-results").empty();
      var resultsView = new Yumblr.Views.RecipesIndex({
        collection: this.results
      });
      this.addSubview("#search-results", resultsView);
    } else {
      this.$("#search-results").html("<div id='no-results'><h2>Sorry, no results found</h2></div>")
    }
  }
});

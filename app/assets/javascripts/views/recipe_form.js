window.Yumblr.Views.RecipeForm = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },
  className: "row col-lg-8 col-lg-offset-2",
  template: JST["recipes/recipe_form"],
  events: {
    "submit form": "submit"
  },
  render: function () {
    var content = this.template({recipe: this.model});
    this.$el.html(content);
    return this;
  },
  submit: function (event) {
    event.preventDefault();
    var attrs = $(event.target).serializeJSON()["recipe"];
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
  }
});

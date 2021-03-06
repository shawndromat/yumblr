window.Yumblr = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    Yumblr.recipes = new Yumblr.Collections.Recipes();
    Yumblr.privateRecipes = new Yumblr.Collections.PrivateRecipes();
    Yumblr.privateRecipes.fetch({
      success: function () {
        Yumblr.recipesArray = Yumblr.privateRecipes.toArray();
      }
    })
    Yumblr.ingredients = new Yumblr.Collections.Ingredients();
    Yumblr.currentUserRecipes = new Yumblr.Collections.Recipes();
    new Yumblr.Routers.AppRouter({
      $rootEl: $("#content"),
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Yumblr.initialize();
});

Backbone.CompositeView = Backbone.View.extend({
  subviews: function () {
    if (!this._subviews) {
      this._subviews = {};
    }
    return this._subviews;
  },
  addSubview: function (selector, subview) {
    var selectorSubview =
      this.subviews()[selector] || (this.subviews()[selector] = []);
    selectorSubview.push(subview);

    //intital render of each subview
    //subsequent renders are the views own responsibility
    this.attachSubview(selector, subview.render());
  },
  attachSubview: function (selector, subview) {
    this.$(selector).append(subview.$el);
    subview.delegateEvents();
  },
  attachSubviews: function () {
    var view = this;
    _(this.subviews()).forEach(function(subviews, selector) {
      _(subviews).each(function (subview) {
        view.attachSubview(selector, subview);
        if (subview.attachSubviews) {
          subview.attachSubviews();
        }
      })
    })
  },
  sortSubviews: function (selector, criteria) {
    var subviews = _(this.subviews()[selector]).sortBy(function (subview) {
        return subview.model.get(criteria);
      })

      this.subviews()[selector] = subviews;
  },
  remove: function () {
    Backbone.View.prototype.remove.call(this);
    _(this.subviews()).forEach(function(subviews, selector) {
      _(subviews).each(function (subview) {
        subview.remove();
      })
    })
  },
  removeSubview: function (selector, subview) {
    var subviews = this.subviews()[selector];
    subviews.splice(subviews.indexOf(subview), 1);
    subview.remove();
  },
  clearSubviews: function (selector) {
    _(this.subviews()[selector]).each(function (subview) {
      subview.remove();
    })
    this.subviews()[selector] = undefined;
  },
  isEmpty: function (selector) {
    return ((!this.subviews()[selector]) || (this.subviews()[selector].length === 0));
  },
  saveRanks: function (selector, subselector) {
    _.each(this.subviews()[selector], function (subview) {
      var index = $(subselector).index(subview.$el);

      //skip if subview in question was the one deleted (index === -1)
      if (index >= 0 && (subview.model.get('rank') !== index + 1)) {
        subview.model.set('rank', index + 1);
        if (subview.model.id) {
          subview.model.save({step: {rank: index + 1 }});
        }
      }
    })
  }
})

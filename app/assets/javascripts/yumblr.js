window.Yumblr = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    Yumblr.recipes = new Yumblr.Collections.Recipes();
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
  leave: function () {
    _(this.subviews()).forEach(function(subviews, selector) {
      _(subviews).each(function (subview) {
        if (subview.leave) {
          subview.leave();
        } else {
          subview.remove();
        }
      })
    })
    this.remove();
  },
  removeSubview: function (selector, subview) {
    var subviews = this.subviews()[selector];
    subviews.splice(subviews.indexOf(subview), 1);
    subview.remove();
  },
})

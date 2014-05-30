window.Yumblr.Views.RecipesIndex = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.collection, 'sync change add reset', this.render)
  },
  tagName: "div",
  className: "row",
  template: JST["recipes/recipes_index"],
  render: function () {
    var content = this.template({recipes: this.collection});
    this.$el.html(content);
    this.toggleActive();
    this.backToTop();
    return this;
  },
  toggleActive: function () {
    var loc = location.href.split("#")[1];
    var $active = this.$el.find(".btn-group a[href='#" + loc + "']");
    $active.siblings().removeClass("active");
    $active.addClass("active");
    if (location.href.indexOf("#") === -1 ) {
      this.$(".btn-group a[href='#']").addClass("active");
    }
  },
  backToTop: function () {
     $(window).scroll(function () {
            if ($(this).scrollTop() > 50) {
                $('#back-to-top').fadeIn();
            } else {
                $('#back-to-top').fadeOut();
            }
        });
        // scroll body to 0px on click
        $('#back-to-top').click(function () {
            $('#back-to-top').tooltip('hide');
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });

        $('#back-to-top').tooltip('show');
  }
});

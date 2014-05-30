window.Yumblr.Views.VideoShow = Backbone.View.extend({
  className: "row",
  template: JST["recipes/video_show"],
  render: function () {
    var content = this.template({step: this.model});
    this.$el.html(content);
    this.embedVideo();
    return this;
  },
  embedVideo: function () {
    $('a.video').embedly({
      key: "dd1f5b1dd4b44cfeb1584e8ff3d3239e",
      display: function(obj){
        // Overwrite the default display.
        if (obj.type === 'video' || obj.type === 'rich'){
          // Figure out the percent ratio for the padding. This is (height/width) * 100
          var ratio = ((obj.height/obj.width)*100).toPrecision(4) + '%'

          // Wrap the embed in a responsive object div. See the CSS here!
          var div = $('<div class="responsive-object">').css({
            paddingBottom: ratio
          });

          // Add the embed to the div.
          div.html(obj.html);

          // Replace the element with the div.
          $(this).replaceWith(div);
        }
      }
    });
  }
})

// $('a.video').embedly({
//     key: 'dd1f5b1dd4b44cfeb1584e8ff3d3239e',
//     query: {maxwidth:530} });

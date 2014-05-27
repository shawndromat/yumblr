$(document).ready(function () {

  $("#auth-modal").on("click", "li a", function (e) {
    e.preventDefault();
    $(this).tab("show");
  })

  $("#sign-in-link").click(function (e) {
    e.preventDefault();

    $("#sign-up").removeClass("active");
    $("#sign-up-tab").removeClass("active");

    $("#sign-in").addClass("active");
    $("#sign-in-tab").addClass("active");
  })

  $("#sign-up-link").click(function (e) {
    e.preventDefault();

    $("#sign-in").removeClass("active");
    $("#sign-in-tab").removeClass("active");

    $("#sign-up").addClass("active");
    $("#sign-up-tab").addClass("active");
  });

  $("#guest-sign-in").click(function (e) {
    e.preventDefault();
    $(".username-field").val("guest");
    $(".password-field").val("password");
  })

});

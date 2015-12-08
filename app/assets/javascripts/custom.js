$(document).ready(function(){
  $.material.init();
  $(".carousel-inner .item:first-child").addClass("active");

  $(".carousel").carousel("pause");

  $(".item img").click(function() {
    $(".fancybox").fancybox({
      speedIn : 600,
      speedOut : 200,
      padding : 2,
      helpers : {
        overlay : {
          locked : false
        }
      },
      beforeShow: function () {
        $(".fancybox-image").css({
          width : 700,
          height : 500
        });
        this.width = 700;
        this.height = 500;
      },
    });
  });

  $(".btn-action-show-images").on("click", function(e) {
    var icon = $(e.currentTarget).find("i");

    if (icon.hasClass("glyphicon-chevron-down")) {
      icon.removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-right");
    } else if (icon.hasClass("glyphicon-chevron-right")) {
      icon.removeClass("glyphicon-chevron-right").addClass("glyphicon-chevron-down");
    }

    $("#images-form").toggle("slow");
  });

  $(document).on("change", ".file-address", function(event) {
    var preview = $(this.parentNode).find("img");
    var input = $(event.currentTarget);
    if (input.val() !== "") {
      $(this.parentNode).find("div").attr("style", "display: block");
    }
    var file = input[0].files[0];
    var reader = new FileReader();

    reader.onload = function(e){
      image_base64 = e.target.result;
      preview.attr("src", image_base64);
    };

    reader.readAsDataURL(file);
  });

  var uploadImage = $("#upload-images-form").data("images");
  var tabAddImage = $("#tab-add-image");
  var tabContent = $(".tab-content");

  if(uploadImage != null) {
    if (uploadImage.length > 0) {
      $(".btn-action-show-images").attr("class", "btn-action-show-images btn btn-info toggler active");
    }

    for (var i = 0; i < uploadImage.length; i++) {
      var new_id = new Date().getTime();
      var link = uploadImage[i].photo.url;

      var checkbox = uploadImage[i].is_main == true ? "checked" : "";
      tabAddImage.find("li.active").attr("class", "");

      var new_tab = $("<li class=\"active\"><a data-toggle=\"tab\" href=" + "#" + new_id + ">New Image</a></li>");
      tabAddImage.append(new_tab);

      tabContent.find("div.active").attr("class", "tab-pane fade");

      var divTabPane = $("<div id=" + new_id + " class= \"tab-pane active\"><input type=\"file\" id=" + "address_images_attributes_" + new_id + "_photo" + " name=" + "address[images_attributes][" + new_id + "][photo]" + " data-fileupload=\"true\" class=\"file-address\"><img alt=" + new_id + " src=" + link + " class=\"img-preview img-thumbnail preview\"/><div id=\"tab-pane-right\"><input id=" + "address_images_attributes_" + new_id + "__destroy" + " type=\"hidden\" name=" + "address[images_attributes][" + new_id + "][_destroy]" + " value=\"false\"><input id=" + "address_images_attributes_" + new_id + "_id" + " type=\"hidden\" name=" + "address[images_attributes][" + new_id + "][id]" + " value=" + uploadImage[i].id + "><a href=\"javascript:void(0);\" rel=\"tooltip\" title=\"Remove this image\" class=\"glyphicon glyphicon-trash\" onclick=\"remove_fields(this)\" data-association=\"images\"></a></div><div class=\"set-main-checkbox\"><input type=\"hidden\" value=\"0\" name=" + "address[images_attributes][" + new_id + "][is_main]" + "><input id=" + "address_images_attributes_" + new_id + "_is_main" + " type=\"checkbox\" name=" + "address[images_attributes][" + new_id + "][is_main]" + " " + checkbox + " class=\"is-main-checkbox\" value=\"1\"> Choose this image is main image</div></div>");
      tabContent.append(divTabPane);

      var activeTab = $("#" + new_id);
      var fname = activeTab.find("img").attr("src").substr(25, 31);
      if (fname === "" || fname === null )
        $("a[href=#" + new_id + "]").html("New Image");
      else
        $("a[href=#" + new_id + "]").html(fname);

      $("#" + new_id).change(function() {
        var filename = $(this).find("img").attr("src").substr(25, 31);
        var lastIndex = filename.lastIndexOf("\\");
        if (lastIndex >= 0) {
          filename = filename.substring(lastIndex + 1);
        }
        if (filename === "" || filename === null )
          $("a[href=#" + $(this).attr("id") + "]").html("New Image");
        else
          $("a[href=#" + $(this).attr("id") + "]").html(filename);
      });
    }
  }
});

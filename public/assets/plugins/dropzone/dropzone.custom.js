/*---------------------------------------------
Template name :  Dashmin
Version       :  1.0
Author        :  ThemeLooks
Author url    :  http://themelooks.com


** Dropzone Init

----------------------------------------------*/

$(function () {
  "use strict";

  Dropzone.options.dropzone01 = {
    addRemoveLinks: true,
    // paramName: "images",
    acceptedFiles: "image/*",
    maxFiles: 10,
    maxFilesize: 1024, // MB
    dictRemoveFile: "",
  };
});

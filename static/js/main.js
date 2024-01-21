var uploadedImage;
var upscaledImage;

function updateUploadStatus() {
  var fileInput = document.getElementById("file");
  var uploadStatus = document.querySelector(".upload-status");
  var uploadButtons = document.getElementById("upload-buttons");

  if (fileInput.files.length > 0) {
    var fileSize = fileInput.files[0].size / 1024 / 1024; // size in MB
    uploadStatus.textContent =
      "Photo has been uploaded. " + fileSize.toFixed(2) + " MB";

    var reader = new FileReader();

    reader.onload = function (e) {
      uploadedImage = new Image();
      uploadedImage.onload = function () {
        var imageContainer = document.getElementById("image-container");
        imageContainer.innerHTML = "";
        imageContainer.appendChild(uploadedImage);

        document.getElementById("uploaded-column").style.display = "none";
        document.getElementById("upscaled-column").style.display = "none";
        uploadButtons.style.display = "block";
        document.getElementById("download-button").style.display = "none";

        // Convert image to base64
        var canvas = document.createElement("canvas");
        canvas.width = uploadedImage.width;
        canvas.height = uploadedImage.height;

        var context = canvas.getContext("2d");
        context.drawImage(uploadedImage, 0, 0);

        var base64Data = canvas.toDataURL("image/png"); // Change 'image/png' to the desired MIME type if needed
        localStorage.setItem("imageData", base64Data);
      };

      uploadedImage.src = e.target.result;
    };

    reader.readAsDataURL(fileInput.files[0]);
  } else {
    uploadStatus.textContent = "";
    uploadButtons.style.display = "none";
    document.getElementById("download-button").style.display = "none";
  }
}

function downloadImage() {
  if (upscaledImage) {
    var link = document.createElement("a");
    link.download = "upscaled-image.png";
    link.href = upscaledImage;
    link.click();
  }
}

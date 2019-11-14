var parallaxAlready = false;
var scene = document.getElementById("scene");
var parallaxInstance = new Parallax(scene, {
  onReady: function () {
    console.log("parallax")
    parallaxAlready = true;
    if (parallaxAlready) {
      setTimeout(function () {
        hideLoadingOverlay();
      }, 1000)
    }
  }
});

function hideLoadingOverlay() {
  let overlay = document.getElementById("overlay");
  overlay.style.opacity = "0";
  overlay.style.zIndex = "-1";
}

function showLoadingOverlay() {
  let overlay = document.getElementById("overlay");
  overlay.style.opacity = "1";
  overlay.style.zIndex = "1000";
}
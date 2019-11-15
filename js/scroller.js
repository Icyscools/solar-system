var triggerScroll = false;
var lastScrollTop = 0;
window.onscroll = function(ev) {
  let content = document.getElementById("content");
  var _top = window.pageYOffset || document.documentElement.scrollTop;
  if (_top > lastScrollTop) {
    // downscroll code
    if (window.scrollY >= 50 && window.scrollY < 150 && !triggerScroll) {
      scrollToElement(content);
    }
  } else {
    // upscroll code
  }
  lastScrollTop = _top <= 0 ? 0 : _top;
};

function scrollToElement(el) {
  triggerScroll = true;
  window.scrollTo({
    behavior: "smooth",
    left: 0,
    top: el.offsetTop
  });
  setTimeout(() => {
    triggerScroll = false;
  }, 1000);
}

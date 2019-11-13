var scene = document.getElementById("scene");
var parallaxInstance = new Parallax(scene);

// Lazy load
var lazyLoadInstance = new LazyLoad({
  elements_selector: ".lazy"
  // ... more custom settings?
});

if (lazyLoadInstance) {
  lazyLoadInstance.update();
}

var activePlanet = document.getElementById("first");
var dataPlanet = getJSON("/js/planets.json");

function changePlanet(el) {
  let planet = el.getAttribute("data-planet");
  console.log(planet);
  let _t = document.getElementById("text-topic");
  let _desc = document.getElementById("text-description");
  let _imgsrc = document.getElementById("img-src");

  let tags = document.getElementsByClassName("card-body");
  let facts = dataPlanet[planet].fact;
  [...tags].forEach((element, index) => {
    element.getElementsByClassName(
      "card-title"
    )[0].innerHTML = `<b>${facts[index].heading}</b>`;
    element.getElementsByClassName(
      "card-text"
    )[0].innerHTML = `${facts[index].text}`;
  });

  _t.innerText = dataPlanet[planet].topic;
  _desc.innerText = "“ " + dataPlanet[planet].description + " ”";
  _imgsrc.setAttribute("data-was-processed", false);
  _imgsrc.setAttribute("data-src", dataPlanet[planet].imgsrc);

  lazyLoadInstance.update();

  if (activePlanet) {
    activePlanet.parentElement.classList.remove("active");
  }

  activePlanet = el;
  el.parentElement.classList.add("active");
  window.location.hash = planet;
}

function getJSON(url, callback) {
  let req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (req.readyState == 4 && req.status == 200) {
      let json = JSON.parse(req.responseText);
      callback(json);
    }
  };
  req.open("GET", url, true);
  req.send();
}

window.onload = function() {
  getJSON("/js/planets.json", function(res) {
    dataPlanet = res;
    let tags = document.getElementById("nav-planet").getElementsByTagName("a");
    [...tags].forEach(element => {
      element.addEventListener("click", () => changePlanet(element));
    });

    let hash = window.location.hash.substr(1);
    if (hash && dataPlanet.hasOwnProperty(hash)) {
      this.changePlanet(
        [...tags].filter(el => el.getAttribute("data-planet") == hash)[0]
      );
    }
  });
};

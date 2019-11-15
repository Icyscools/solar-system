var scene = document.getElementById("scene");
var parallaxInstance = new Parallax(scene);

// Lazy load
var lazyLoadInstance = new LazyLoad({
  elements_selector: ".lazy",
  callback_reveal: function(el) {
    // console.log("Start loading...")
    // console.log(el)
    setTimeout(function() {
      if (loadPlanet === false) {
        showLoadingOverlay();
      }
    }, 150);
  },
  callback_loaded: function() {
    // console.log("Finish loading :)")
    let content = document.getElementById("content");
    content.style.opacity = "1";
    loadPlanet = true;
    hideLoadingOverlay();
  }
});

if (lazyLoadInstance) {
  lazyLoadInstance.update();
}

var activePlanet;
var dataPlanet;
var loadPlanet = false;
function changePlanet(el) {
  let planet = el.getAttribute("data-planet");
  let content = document.getElementById("content");
  let _t = document.getElementById("text-topic");
  let _desc = document.getElementById("text-description");
  let _imgsrc = document.getElementById("img-src");
  let _btn_indepth = document.getElementById("read-more");
  let tags = document.getElementsByClassName("card-body");
  let lt_arrow = document.getElementById("left-arrow");
  let rt_arrow = document.getElementById("right-arrow");
  if (el != activePlanet || activePlanet == null) {
    content.style.opacity = "0";
    setTimeout(function() {
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
      _imgsrc.setAttribute("src", "");
      _imgsrc.setAttribute("data-src", dataPlanet[planet].imgsrc);
      _btn_indepth.setAttribute("href", dataPlanet[planet].indepth);

      loadPlanet = false;
      lazyLoadInstance.update();

      if (activePlanet) {
        activePlanet.parentElement.classList.remove("active");
      }

      activePlanet = el;
      el.parentElement.classList.add("active");

      if (el.parentElement.previousElementSibling !== null) {
        let prev_planet =
          el.parentElement.previousElementSibling.firstElementChild;
        lt_arrow.getElementsByTagName("span")[0].onclick = () =>
          changePlanet(prev_planet);
        lt_arrow.firstElementChild.style.display = "block";
        lt_arrow.style.opacity = "1";
      } else {
        lt_arrow.getElementsByTagName("span")[0].onclick = "";
        lt_arrow.firstElementChild.style.display = "none";
        lt_arrow.style.opacity = "0";
      }

      if (el.parentElement.nextElementSibling !== null) {
        let next_planet = el.parentElement.nextElementSibling.firstElementChild;
        rt_arrow.getElementsByTagName("span")[0].onclick = () =>
          changePlanet(next_planet);
        rt_arrow.firstElementChild.style.display = "block";
        rt_arrow.style.opacity = "1";
      } else {
        rt_arrow.getElementsByTagName("span")[0].onclick = "";
        rt_arrow.firstElementChild.style.display = "none";
        rt_arrow.style.opacity = "0";
      }

      window.location.hash = planet;
    }, 1250);
  }
}

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
  getJSON("./js/planets.json", function(res) {
    dataPlanet = res;
    let tags = document.getElementById("nav-planet").getElementsByTagName("a");
    [...tags].forEach(element => {
      element.addEventListener("click", () => changePlanet(element));
    });

    let hash = window.location.hash.substr(1);
    if (hash && hash.trim() != "" && dataPlanet.hasOwnProperty(hash)) {
      let target = [...tags].filter(
        el => el.getAttribute("data-planet") == hash
      )[0];
      if (target != null) {
        this.changePlanet(target);
      } else {
        this.changePlanet([...tags][0]);
      }
    } else {
      this.changePlanet([...tags][0]);
    }
  });
};

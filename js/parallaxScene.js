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

let dataPlanet = {
  sun: {
    topic: "ดวงอาทิตย์",
    description:
      "ดาวฤกษ์สีเหลือง ศูนย์กลางระบบสุริยจักรวาล เป็นแหล่งพลังงานสำคัญที่สุดของสิ่งมีชีวิตบนโลก แรงโน้มถ่วงของดวงอาทิตย์ดึงดูด ทุกอย่าง ตั้งแต่ดาวเคราะห์ขนาดใหญ่ ไปจนถึงเศษเสี้ยวเล็กๆ ในวงโคจร",
    imgsrc: "../assets/sun.png"
  },
  mercury: {
    topic: "ดาวพุธ",
    description:
      "ดาวเคราะห์ที่อยู่ใกล้ดวงอาทิตย์มากที่สุด และเล็กที่สุดในระบบสุริยะ แต่ใหญ่กว่าดวงจันทร์บริวารของโลกเป็นดาวเคราะห์โคจรรอบดวงอาทิตย์เร็วที่สุด โดยที่ 1 รอบการโคจรใช้เวลาเพียง 88 วันบนโลก",
    imgsrc: "../assets/mercury.png"
  },
  venus: {
    topic: "ดาวศุกร์",
    description:
      "ดาวศุกร์หมุนอย่างช้าๆ และหมุนในทิศทางตรงกันข้ามกับดาวเคราะห์อื่น มีชั้นบรรยากาศที่หนา ทำให้ไม่สามารถระบายความร้อนออกไปได้ ดาวศุกร์จึงเป็นดาวเคราะห์ที่ร้อนที่สุดในระบบสุริยะ",
    imgsrc: "../assets/venus.png"
  },
  earth: {
    topic: "โลก",
    description:
      "ดาวโลก บ้านของเราที่รู้จักกันดี เป็นแหล่งที่อยู่ของสิ่งมีชีวิต และเป็นดาวเคราะห์ดวงเดียวในระบบสุริยะที่มีน้ำบนพื้นผิวดาว",
    imgsrc: "../assets/earth.png"
  },
  mars: {
    topic: "ดาวอังคาร",
    description:
      "ดาวเคราะห์สีแดงที่เต็มไปด้วยฝุ่น หนาวเย็น และทะเลทราย โดยดาวอังคารมีชั้นบรรยากาศที่บางมาก",
    imgsrc: "../assets/mars.png"
  },
  jupiter: {
    topic: "ดาวพฤหัสบดี",
    description:
      "ดาวพฤหัสเป็นดาวที่ใหญ่ที่สุดและ มีมวลมากกว่าสองเท่าของมวล ดาวเคราะห์ดวงอื่นในระบบสุริยะรวมกัน",
    imgsrc: "../assets/jupiter.png"
  },
  saturn: {
    topic: "ดาวเสาร์",
    description: "ดาวเสาร์เป็นดาวเคราะห์แก๊สขนาดใหญ่ มีวงแหวนน้ำแข็งที่โดดเด่น",
    imgsrc: "../assets/saturn.png"
  },
  uranus: {
    topic: "ดาวยูเรนัส",
    description:
      "เป็นดาวเคราะห์ที่หมุนทำมุมเกือบ 90 องศาจากระนาบโคจร การเอียงที่ไม่เหมือนใครนี้ทำให้ดาวยูเรนัสหมุนไปด้านข้าง",
    imgsrc: "../assets/uranus.png"
  },
  nepturn: {
    topic: "ดาวเนปจูน",
    description:
      "ดาวเคราะห์ดวงที่ 8 ของระบบสุริยะ อยู่ห่างไกลจากดวงอาทิตย์มากที่สุด ดาวเนปจูนมืดมิด มีอากาศที่หนาวเย็น และมีลมความเร็วเหนือเสียงพัดพาอยู่ตลอดเวลา",
    imgsrc: "../assets/neptune.png"
  }
};

var activePlanet = document.getElementById("first");

function changePlanet(el) {
  let planet = el.getAttribute("data-planet");
  console.log(planet);
  let _t = document.getElementById("text-topic");
  let _desc = document.getElementById("text-description");
  let _imgsrc = document.getElementById("img-src");

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
}

window.onload = function() {
  let tags = document.getElementById("nav-planet").getElementsByTagName("a");
  [...tags].forEach(element => {
    element.addEventListener("click", () => changePlanet(element));
  });
};

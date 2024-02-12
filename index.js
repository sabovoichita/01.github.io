let activePage = "home";

function $(selector) {
  const el = document.querySelector(selector);
  return el;
}

function hide(id) {
  console.info("hide %o", id);
  $("#" + id).style.display = "none";
  document.getElementById(id).style.display = "none";
}
function show(id) {
  console.info("show %o", id);
  var page = $(`#${id}`);
  console.info("page %o", page);
  page.style.display = "block";
}

function showPage(id) {
  console.info("show page %o", id);
  const prevLink = $("a[data-page=" + activePage + "]");
  prevLink.classList.remove("active");
  hide(activePage);

  const nextLink = $(`a[data-page=${id}]`);
  nextLink.classList.add("active");
  show(id);
  activePage = id;
}

function initEvents() {
  const toolbar = $("#top-menu-bar");
  toolbar.addEventListener("click", (e) => {
    if (e.target.matches("a")) {
      const page = e.target.dataset.page;
      console.warn("click %o", page);
      showPage(page);
    }
  });
}

function sortSkillsByEndorcements(a, b) {
  console.info("sort", a, b);
  return b.endorcements - a.endorcements;
}

function sortByName(a, b) {
  return a.name.localeCompare(b.name);
}
function showSkills(skills) {
  skills.sort(sortByName);
  //   skills.sort(sortSkillsByEndorcements);

  const ul = $("#skills ul");

  const text = skills.map((skill) => {
    let cls = "";
    if (skill.favorite == true) {
      cls = "favorite";
    }

    console.info("%o (&o)", skill.favorite, cls);
    return `<li class = "${cls}">${skill.name}<span>-${skill.endorcements}</span></li>`;
  });
  console.warn(text);
  ul.innerHTML = text.join("");
}

function loadSkills() {
  fetch("skills.json").then((r) => {
    r.json().then((skills) => {
      showSkills(skills);
    });
  });
}

function loadLanguages() {
  fetch("languages.json")
    .then((response) => response.json())
    .then((languages) => {
      prinJsonIntoTable(languages, "languages-table");
    });
}

function prinJsonIntoTable(jsonData, elementId) {
  var col = [];
  for (var i = 0; i < jsonData.length; i++) {
    for (var key in jsonData[i]) {
      if (col.indexOf(key) === -1) {
        col.push(key);
      }
    }
  }
  //Create HTML Table
  var table = document.createElement("table");
  //Create row for the header
  var tr = table.insertRow(-1);
  for (var i = 0; i < col.length; i++) {
    var th = document.createElement("th");
    th.innerHTML = col[i];
    tr.appendChild(th);
  }
  //Add data to table rows
  for (var i = 0; i < jsonData.length; i++) {
    tr = table.insertRow(-1);

    for (var j = 0; j < col.length; j++) {
      var tabCEll = tr.insertCell(-1);
      tabCEll.innerHTML = jsonData[i][col[j]];
    }
  }
  //All columns for header
  var divContainer = document.getElementById("table");
  divContainer.innerHTML = " ";
  divContainer.appendChild(table).style.border = "none";
}
showPage(activePage);
initEvents();
loadSkills();
loadLanguages();

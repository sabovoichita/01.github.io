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

showPage(activePage);
initEvents();
loadSkills();

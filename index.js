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

showPage(activePage);
initEvents();

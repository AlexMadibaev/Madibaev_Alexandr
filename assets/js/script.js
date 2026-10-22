'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.textContent = this.querySelector("[data-testimonials-title]").textContent;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// portfolio variables
const portfolioItems = document.querySelectorAll("[data-filter-item]"); // project-item also has data-filter-item
const portfolioModalContainer = document.querySelector("[data-portfolio-modal-container]");
const portfolioModalCloseBtn = document.querySelector("[data-portfolio-modal-close-btn]");
const portfolioOverlay = document.querySelector("[data-portfolio-overlay]");

// portfolio modal variables
const portfolioModalImg = document.querySelector("[data-portfolio-modal-img]");
const portfolioModalTitle = document.querySelector("[data-portfolio-modal-title]");
const portfolioModalCategory = document.querySelector("[data-portfolio-modal-category]");
const portfolioModalDescription = document.querySelector("[data-portfolio-modal-description]");

// portfolio modal toggle function
const portfolioModalFunc = function () {
  const isOpening = !portfolioModalContainer.classList.contains("active");
  portfolioModalContainer.classList.toggle("active", isOpening);
  portfolioOverlay.classList.toggle("active", isOpening);
  document.body.classList.toggle("preview-open", isOpening);
  if (isOpening) portfolioModalCloseBtn.focus();
  else if (lastProjectTrigger) lastProjectTrigger.focus();
}

// add click event to all portfolio items
for (let i = 0; i < portfolioItems.length; i++) {

  portfolioItems[i].addEventListener("click", function (event) {
    event.preventDefault();
    lastProjectTrigger = this.querySelector("a");
    const anchorTag = this.querySelector("a");
    if (anchorTag) {
      portfolioModalImg.src = anchorTag.dataset.projectUrl;
      portfolioModalImg.alt = anchorTag.dataset.projectTitle;
      portfolioModalTitle.textContent = anchorTag.dataset.projectTitle;
      portfolioModalCategory.textContent = anchorTag.dataset.projectCategory;
      portfolioModalDescription.textContent = anchorTag.dataset.projectDescription || "";

      portfolioModalFunc();
    }
  });

}

// add click event to portfolio modal close button
portfolioModalCloseBtn.addEventListener("click", portfolioModalFunc);
portfolioOverlay.addEventListener("click", portfolioModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); this.setAttribute("aria-expanded", String(this.classList.contains("active"))); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    select.setAttribute("aria-expanded", "false");
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// Accessible, deep-linkable page navigation
const navigationLinks = [...document.querySelectorAll("[data-nav-link]")];
const pages = [...document.querySelectorAll("[data-page]")];
const knownPages = new Set(pages.map(page => page.dataset.page));
function showPage(pageName, updateHash = true) {
  const name = knownPages.has(pageName) ? pageName : "about";
  pages.forEach(page => page.classList.toggle("active", page.dataset.page === name));
  navigationLinks.forEach(link => {
    const active = link.textContent.trim().toLowerCase() === name;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  if (updateHash && location.hash !== "#" + name) history.pushState(null, "", "#" + name);
  window.scrollTo({ top: 0, behavior: "auto" });
}
navigationLinks.forEach(link => link.addEventListener("click", () => showPage(link.textContent.trim().toLowerCase())));
window.addEventListener("hashchange", () => showPage(location.hash.slice(1).toLowerCase(), false));
window.addEventListener("popstate", () => showPage(location.hash.slice(1).toLowerCase(), false));
showPage(location.hash.slice(1).toLowerCase(), false);

// Keyboard accessibility for the project preview
let lastProjectTrigger = null;
document.querySelectorAll('.project-item a').forEach(link => {
  link.addEventListener('click', event => { event.preventDefault(); lastProjectTrigger = link; });
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && portfolioModalContainer.classList.contains('active')) {
    portfolioModalFunc();
    if (lastProjectTrigger) lastProjectTrigger.focus();
  }
});

// Keep keyboard focus within the open preview dialog.
document.addEventListener('keydown', event => {
  if (event.key !== 'Tab' || !portfolioModalContainer.classList.contains('active')) return;
  const dialog = portfolioModalContainer.querySelector('[role="dialog"]');
  const focusable = [...dialog.querySelectorAll('button:not([disabled]),a[href]')];
  if (!focusable.length) return;
  const first = focusable[0], last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {event.preventDefault();last.focus();}
  else if (!event.shiftKey && document.activeElement === last) {event.preventDefault();first.focus();}
});

// Avoid double submissions while the browser navigates to the form provider.
if (form) form.addEventListener('submit', event => {
  if (!form.checkValidity()) {event.preventDefault();form.reportValidity();return;}
  formBtn.disabled = true;
  const label = formBtn.querySelector('span');
  if (label) label.textContent = 'Sending…';
});

/*==================== Показать меню ====================*/

const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  // Проверка переменных
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      // Добавляет класс show-menu в тег div с классом nav__menu
      nav.classList.toggle("show-menu");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

/*==================== Скрыть меню ====================*/

const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // При нажатии на nav__link, удаляет класс show-menu
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== Прокрутка до нужной секции при клике по ссылке ====================*/

const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== Прокрутка наверх ====================*/

function scrollTop() {
  const scrollTop = document.getElementById("scroll-top");
  // Когда прокрутка превышает высоту области просмотра, добавляется класс show-scroll к тегу a с классом scroll-top.
  if (this.scrollY >= 200) scrollTop.classList.add("show-scroll");
  else scrollTop.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollTop);

/*==================== Тёмная/светлая темы ====================*/

const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bx-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bx-moon" : "bx-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "bx-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*==================== Подготовка для печати на А4 и скачивания ====================*/

function scaleCv() {
  document.body.classList.add("scale-cv");
}

/*==================== Вернуть всё как было после загрузки и печати ====================*/

function removeScale() {
  document.body.classList.remove("scale-cv");
}

/*==================== Генерация PDF ====================*/
// Зона генерации PDF
let areaCv = document.getElementById("area-cv");

let resumeButton = document.getElementById("resume-button");

// Html2pdf опции

let opt = {
  margin: 0,
  filename: "Leshenko-ReactDeveloper-Cv.pdf",
  image: { type: "jpeg", quality: 0.98 },
  html2canvas: { scale: 4 },
  jsPDF: { format: "a4", orientation: "portrait" },
};

// Функция вызова areaCv and Html2Pdf опций

function generateResume() {
  html2pdf(areaCv, opt);
}

// Когда кнопка нажата, она выполняет три функции
resumeButton.addEventListener("click", () => {
  // 1. .scale-cv добавлен в тело, где он уменьшает размер элементов для генерации pdf

  scaleCv();

  // 2. Генерация PDF

  generateResume();

  // 3. Класс .scale-cv удаляется из тела через 5 секунд, чтобы вернуться к нормальному размеру

  setTimeout(removeScale, 5000);
});

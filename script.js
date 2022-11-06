'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContant = document.querySelectorAll('.operations__content');

const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// BUTTON SCROLLING
btnScrollTo.addEventListener('click', function (event) {
  //Координати секціії 1
  const c1coords = section1.getBoundingClientRect();
  console.log('Координати секціії 1: ', c1coords);
  // console.log(event.target.getBoundingClientRect());
  //Координати HERO Section  кнопки
  console.log(
    'Координати кнопки: pageXOffset window.pageYOffset',
    window.pageXOffset,
    window.pageYOffset
  );
  console.log(
    'Координати секції HERO Section:',
    document.documentElement.clientWidth,
    document.documentElement.clientHeight
  );
  console.log(
    'Scroll to left  window.pageXOffset',
    c1coords.left + window.pageXOffset
  );
  console.log(
    'Scroll to top window.pageYOffset',
    c1coords.top + window.pageYOffset
  );
  // window.scrollTo(
  //   c1coords.left + window.pageXOffset,
  //   c1coords.top + window.pageYOffset
  // );
  /*******OLD SCHOOL*********/
  window.scrollTo({
    left: c1coords.left + window.pageXOffset,
    top: c1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });
  /*******OLD SCHOOL*********/
  // section1.scrollIntoView({ behavior: 'smooth' });
});

// ------*******--------PAGE NAVIGATION---------*******---------

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (event) {
//     event.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// 1. Add event listner to common parent element
// 2. Determine what element originated the event
document
  .querySelector('.nav__links')
  .addEventListener('click', function (event) {
    event.preventDefault();
    // Знайшли ID елемент

    if (event.target.classList.contains('nav__link')) {
      document
        .querySelector(event.target.getAttribute('href'))
        .scrollIntoView({ behavior: 'smooth' });
    }
  });

// ------*******--------TABBED COMPONENT---------*******---------

// const tabs = document.querySelectorAll('.operations__tab');
// const tabsContainer = document.querySelector('.operations__tab-container');
// const tabsContant = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (event) {
  event.preventDefault();
  const clickedTab = event.target.closest('.operations__tab');
  // ********* MODERN WAY:
  if (!clickedTab) return;
  // clean all tabs from 'operations__tab--active' for mooving buttoms down:
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clickedTab.classList.add('operations__tab--active');
  // ******** OR ANOTHER WAY TO DO THIS:
  // if (clickedTab) {
  //   clickedTab.classList.add('operations__tab--active');
  // }

  //  ******* Activate content area

  const activeText = document.querySelector(
    `.operations__content--${clickedTab.dataset.tab}`
  );
  tabsContant.forEach(blockContent => {
    blockContent.classList.remove('operations__content--active');
  });
  activeText.classList.add('operations__content--active');
});

// ------*******--------MENU FADE ANIMATION ---------*******---------

const handlerHover = function (event) {
  if (event.target.classList.contains('nav__link')) {
    const link = event.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
/* TWO WAYS OF CALLING FUNCTION----FIRST WAY----- */
// nav.addEventListener('mouseover', function (e) {
//   handlerHover(e, 0.5);
// });
// nav.addEventListener('mouseout', function (e) {
//   handlerHover(e, 1);
// });
/* TWO WAYS OF CALLING FUNCTION----SECOND WAY----- */
nav.addEventListener('mouseover', handlerHover.bind(0.6));
nav.addEventListener('mouseout', handlerHover.bind(1));

// nav.addEventListener('mouseover', function (event) {
//   if (event.target.classList.contains('nav__link')) {
//     const link = event.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');
//     console.log(logo);
//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = 0.5;
//     });
//     logo.style.opacity = 0.5;
//   }
// });
// nav.addEventListener('mouseout', function (event) {
//   event.preventDefault();
//   if (event.target.classList.contains('nav__link')) {
//     const link = event.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');
//     console.log(logo);
//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = 1;
//     });
//     logo.style.opacity = 1;
//   }
// });

// nav.addEventListener('mouseover', function (event) {
//   handler(event, 0.5);
// });
// nav.addEventListener('mouseout', function (event) {
//   handler(event, 1);
// });
// ------*******--------STICKY NAVIGATION ---------*******---------

// const initialCoords = section1.getBoundingClientRect();
// // console.log(initialCoords);
// window.addEventListener('scroll', function (event) {
//   // console.log('window.scrollY: ', window.scrollY);
//   if (initialCoords.top < this.window.scrollY) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// ------******* STICKY NAVIGATION: Intersection Observer API *******---------
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);
// const obsCallBack = function (enries, observe) {
//   enries.forEach(entry => console.log('ENTRY: ', entry));
// };

// const obsOptions = {
//   root: null,
//   threshold: 0.1,
// };

// const observer = new IntersectionObserver(obsCallBack, obsOptions);
// observer.observe(section1);

// ------******* Reveal section: Intersection Observer API *******---------
const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log('EnTRY: ', entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const allSections = document.querySelectorAll('.section');
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null, // null if View port
  threshold: 0.15,
  // rootMargin: `-${15}px`,
});
allSections.forEach(function (section) {
  // console.log('SECTION: ', section);
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');  /// ПРИБРАТИ!!!
});

// ------******* Lazy loading images: Intersection Observer API *******---------
//
const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log('observer:', observer);
  // console.log(entry);
  // console.log(entry.target.dataset);
  if (!entry.isIntersecting) return;
  // Replace the src data
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgTargets = document.querySelectorAll('img[data-src]');
// console.log(imgTargets);

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});
imgTargets.forEach(img => imgObserver.observe(img));

// ------******* Slader *******---------
//
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const slider = document.querySelector('.slider');
slider.style.transform = 'scale(0.5)';
slider.style.overflow = 'visible';
console.log('Slider: ', slider);
slides.forEach(
  (slide, index) => (slide.style.transform = `translateX(${index * 100}%)`)
);

// 0, 100%, 200%, 300%
// const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter', function (event) {
//   console.log(event);
// });
// Генеруємо випадкове число : rgb(250,250,250) від 0 до 250
// const randomInt = (min, max) =>
//   Math.trunc(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 250)},${randomInt(0, 250)},${randomInt(0, 250)})`;
// console.log(randomColor());

// document
//   .querySelector('.nav__link')
//   .addEventListener('click', function (event) {
//     this.style.backgroundColor = randomColor();
//     console.log('LINK: ', event.target, event.currentTarget);
//   });
// document
//   .querySelector('.nav__links')
//   .addEventListener('click', function (event) {
//     this.style.backgroundColor = randomColor();
//     console.log('LIST: ', event.target, event.currentTarget);
//   });
// document.querySelector('.nav').addEventListener(
//   'click',
//   function (event) {
//     this.style.backgroundColor = randomColor();
//     console.log('NAV: ', event.target, event.currentTarget);
//   },
//   true
// );

// const h1 = document.querySelector('h1');
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);

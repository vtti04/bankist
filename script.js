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
  console.log(this);
  if (event.target.classList.contains('nav__link')) {
    const link = event.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    console.log(logo);
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
/* --------REFACTORING CODE------------------------------*/

// nav.addEventListener('mouseover', function (event) {
//   if (event.target.classList.contains('nav__link')) {
//     const clicked = event.target;
//     const siblings = clicked.closest('.nav').querySelectorAll('.nav__link');
//     console.log('mouse over is here, event.currentTarget', event.currentTarget);
//     const logo = clicked.closest('.nav').querySelector('img');

//     siblings.forEach(el => {
//       if (el !== clicked) el.style.opacity = 0.5;
//     });
//     logo.style.opacity = 0.5;

//     console.log('siblings: ', siblings, logo, clicked);
//   }
// });
// nav.addEventListener('mouseout', function (event) {
//   if (event.target.classList.contains('nav__link')) {
//     const clicked = event.target;
//     const siblings = clicked.closest('.nav').querySelectorAll('.nav__link');
//     console.log('mouse OUT is here, event.currentTarget', event.currentTarget);
//     const logo = clicked.closest('.nav').querySelector('img');

//     siblings.forEach(el => {
//       if (el !== clicked) el.style.opacity = 1;
//     });
//     logo.style.opacity = 1;

//     console.log('siblings: ', siblings, logo, clicked);
//   }
// });
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

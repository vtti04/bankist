'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
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

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (event) {
  //Координати секціії 1
  const c1coords = section1.getBoundingClientRect();
  // console.log('Координати секціії 1: ', c1coords);
  // // console.log(event.target.getBoundingClientRect());
  // //Координати HERO Section  кнопки
  // console.log(
  //   'Координати кнопки: pageXOffset window.pageYOffset',
  //   window.pageXOffset,
  //   window.pageYOffset
  // );
  // console.log(
  //   'Координати секції HERO Section:',
  //   document.documentElement.clientWidth,
  //   document.documentElement.clientHeight
  // );
  // console.log(
  //   'Scroll to left  window.pageXOffset',
  //   c1coords.left + window.pageXOffset
  // );
  // console.log(
  //   'Scroll to top window.pageYOffset',
  //   c1coords.top + window.pageYOffset
  // );
  // window.scrollTo(
  //   c1coords.left + window.pageXOffset,
  //   c1coords.top + window.pageYOffset
  // );
  /*******OLD SCHOOL*********/
  // window.scrollTo({
  //   left: c1coords.left + window.pageXOffset,
  //   top: c1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  /*******OLD SCHOOL*********/
  section1.scrollIntoView({ behavior: 'smooth' });
});

// const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter', function (event) {
//   console.log(event);
// });
// Генеруємо випадкове число : rgb(250,250,250) від 0 до 250
const randomInt = (min, max) =>
  Math.trunc(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 250)},${randomInt(0, 250)},${randomInt(0, 250)})`;
console.log(randomColor());

document
  .querySelector('.nav__link')
  .addEventListener('click', function (event) {
    this.style.backgroundColor = randomColor();
    console.log('LINK: ', event.target, event.currentTarget);
  });
document
  .querySelector('.nav__links')
  .addEventListener('click', function (event) {
    this.style.backgroundColor = randomColor();
    console.log('LIST: ', event.target, event.currentTarget);
  });
document.querySelector('.nav').addEventListener(
  'click',
  function (event) {
    this.style.backgroundColor = randomColor();
    console.log('NAV: ', event.target, event.currentTarget);
  },
  true
);

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

const header = document.querySelector('.header');
const allSelection = document.querySelectorAll('.section');
console.log(allSelection);

const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookie to improve our survis';
message.innerHTML =
  'We use cookie to improve our service <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message);
// header.append(message.cloneNode(true));
header.before(message);
// header.after(message);
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    console.log(message.parentElement);
    message.remove();
  });

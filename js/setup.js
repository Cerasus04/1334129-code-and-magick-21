'use strict';

var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', ' Вашингтон'];
var SURNAMES = ['да Мария', 'Верон', 'Мирабела', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_COUNT = 4;

var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIRE_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var Keys = {
  ESC: 'Escape',
  ENTER: 'Enter'
};

var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var createPlayerItem = function (playerObject) {
  var playerItem = playerTemplateItem.cloneNode(true);
  var playerName = playerItem.querySelector('.setup-similar-label');
  var playerCoatColor = playerItem.querySelector('.wizard-coat');
  var playerEyesColor = playerItem.querySelector('.wizard-eyes');

  playerName.textContent = playerObject.name;
  playerCoatColor.style.fill = playerObject.coatColor;
  playerEyesColor.style.fill = playerObject.eyesColor;

  return playerItem;
};

var createPlayersArray = function (WIZARD_COUNT) {
  var playersArray = [];
  for (var i = 0; i < WIZARD_COUNT; i++) {
    playersArray.push({
      name: getRandomElement(FIRST_NAMES) + ' ' + getRandomElement(SURNAMES),
      coatColor: getRandomElement(COAT_COLORS),
      eyesColor: getRandomElement(EYES_COLORS)
    });
  }

  return playersArray;
};

var initializePlayerSetup = function () {
  var playersFragment = document.createDocumentFragment();
  var playersArray = createPlayersArray(WIZARD_COUNT);
  for (var i = 0; i < playersArray.length; i++) {
    playersFragment.appendChild(createPlayerItem(playersArray[i]));
  }
  playersList.appendChild(playersFragment);
};

var playerTemplateItem = document
  .querySelector('#similar-wizard-template')
  .content.querySelector('.setup-similar-item');
var playerContainer = document.querySelector('.setup-similar');
var playersList = document.querySelector('.setup-similar-list');
var setup = document.querySelector('.setup');

initializePlayerSetup();
playerContainer.classList.remove('hidden');

var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');


var onPopupEscPress = function (evt) {
  if (evt.key === Keys.ESC && !evt.target.classList.contains(`setup-user-name`)) {
    evt.preventDefault();
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === Keys.ENTER) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === Keys.ENTER) {
    closePopup();
  }
});

var wizardSetup = document.querySelector('.setup');
var wizardColorCoat = wizardSetup.querySelector('.wizard-coat');
var wizardColorEyes = wizardSetup.querySelector('.wizard-eyes');
var wizardColorFireball = wizardSetup.querySelector('.setup-fireball');

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var setNewColor = function (colors, element) {
  var newColor = colors[getRandomInt(0, colors.length - 1)];

  if (element.tagName === 'DIV') {
    element.style.backgroundColor = newColor;
  } else {
    element.style.fill = newColor;
  }

  return newColor;
};

var onWizardCoatClick = function (evt) {
  wizardSetup.querySelector('input[name=coat-color]').value = setNewColor(COAT_COLORS, evt.target);
};

var onWizardEyesClick = function (evt) {
  wizardSetup.querySelector('input[name=eyes-color]').value = setNewColor(EYES_COLORS, evt.target);
};

var onWizardfireballClick = function (evt) {
  setNewColor(FIRE_COLORS, evt.target);
};

wizardColorCoat.addEventListener('click', onWizardCoatClick);
wizardColorEyes.addEventListener('click', onWizardEyesClick);
wizardColorFireball.addEventListener('click', onWizardfireballClick);

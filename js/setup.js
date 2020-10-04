'use strict';

var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', ' Вашингтон'];
var SURNAMES = ['да Мария', 'Верон', 'Мирабела', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_COUNT = 4;

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
      eyesColor: getRandomElement(EYE_COLORS)
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
setup.classList.remove('hidden');
playerContainer.classList.remove('hidden');

var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    // if (!evt.matches('input[type="text"]')) {
    //   closePopup()
    // };
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
  if (evt.key === 'Enter') {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
});

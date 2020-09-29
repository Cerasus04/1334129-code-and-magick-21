'use strict';

var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', ' Вашингтон'];
var SURNAMES = ['да Мария', 'Верон', 'Мирабела', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_COUNT = 4;

// Дополнительная функции
var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

// Функция для создания массива данных игроков

var createPlayerObject = function () {
  var name = getRandomElement(FIRST_NAMES) + ' ' + getRandomElement(SURNAMES);
  var coatColor = getRandomElement(COAT_COLORS);
  var eyesColor = getRandomElement(EYE_COLORS);
  var player = [name, coatColor, eyesColor];
  return player;
};

// Функция создания игрока

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

var createPlayersArray = function (arrayLength) {
  var playersArray = [];
  for (var i = 0; i < arrayLength; i++) {
    playersArray.push(createPlayerObject());
  }
  return playersArray;
};

var initializePlayerSetup = function () {
  var playersFragment = document.createDocumentFragment();
  var playersArray = createPlayersArray(WIZARD_COUNT);
  for (var i = 0; i < playersArray.length; i++) {
    var newPlayerItem = createPlayerItem(playersArray[i]);
    playersFragment.appendChild(newPlayerItem);
  }
  playersList.appendChild(playersFragment);
};

// Находим DOM-элементы
var playerTemplateItem = document
  .querySelector('#similar-wizard-template')
  .content.querySelector('.setup-similar-item');
var playerContainer = document.querySelector('.setup-similar');
var playersList = document.querySelector('.setup-similar-list');
var setup = document.querySelector('.setup');


// Добавляем результат работы в DOM, снимаем скрывающий класс
initializePlayerSetup(WIZARD_COUNT);
setup.classList.remove('hidden');
playerContainer.classList.remove('hidden');


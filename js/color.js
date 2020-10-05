'use strict';

var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIRE_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var wizardSetup = document.querySelector('.setup-player');
var wizardColorCoat = wizardSetup.document.querySelector('.coat-color');
var wizardColorEyes = wizardSetup.document.querySelector('.eyes-color');
var wizardColorFireball = wizardSetup.document.querySelector('fireball-color');

var getRandomRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getShuffleArray = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
  return array;
};

var getNewColor = function (array) {

  var setNewColor = function (obj, colors) {
    var newColor = getShuffleArray(array).slice(0, getRandomRange(0, array.length));
    var currentColor = obj.input.value;
    while (newColor === currentColor) {
      newColor = setNewColor(obj, colors);
    }
    return newColor;
  };

  var colorize = function (obj, colors) {
    obj.element.addEventListener(`click`, function () {
      var newColor = setNewColor(obj, colors);
      if (obj.element.tagName.toLowerCase() === `div`) {
        obj.element.style.backgroundColor = newColor;
      } else {
        obj.element.style.fill = newColor;
      }
      obj.input.value = newColor;
    });
  };
  return colorize;
};

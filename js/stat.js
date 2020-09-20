'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 15;
var TEXT_WIDTH = 50;
var BAR_MAX_HEIGHT = 150;


var CONTENT_GAP = 50; //расстояние между именами
var CONTENT_X = CLOUD_X + CONTENT_GAP; //начало текста по х = сдвиг окна по х + расстояние между именами
var CONTENT_Y = CLOUD_Y + CONTENT_GAP; // начало текста по у = сдвиг окна по y + расстояние между именами

//var BAR_MAX_HEIGHT = 150;

var barWidth = 40;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) { //отрисовка окна
  renderCloud(
    ctx,
    CLOUD_X + GAP,
    CLOUD_Y + GAP,
    'rgba(0, 0, 0, 0.3)' //тень
  );
  renderCloud( //белое окно
    ctx,
    CLOUD_X,
    CLOUD_Y,
    '#fff'
  );

  ctx.fillStyle = '#000'; //цвет заливки уменя должен будет меняться

  var maxTime = getMaxElement(times); //максимальное время, чтобы понять, кто победил

  for (var i = 0; i < players.length; i++) { // Цикл в котором перебераются значения очков игроков для отрисовки имени
    //певый элемент 0, пока индекс элемента меньше индекса последнего элемента массива, шаг 1
    ctx.fillText(//отрисовка строки текст
      players[i],
      CONTENT_X + (barWidth + TEXT_WIDTH) * i,//координата по х, где начиается имя игрока
      CLOUD_HEIGHT - GAP //координата по у, где начинается имя игрока
    );

    ctx.fillRect( //рисует прямоугольник с заливкой
      CONTENT_X + (barWidth + TEXT_WIDTH) * i,// координата по х
      CONTENT_Y - FONT_GAP, //координата по у
      barWidth, //ширина
      (BAR_MAX_HEIGHT * times[i]) / maxTime//высота
    );
  }
};

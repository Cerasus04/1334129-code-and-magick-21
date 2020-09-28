'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_GAP = 50;
var BAR_MAX_HEIGHT = 150;
var CLOUD_OFFSET_X = CLOUD_X + GAP;
var CLOUD_OFFSET_Y = CLOUD_Y + GAP;
var BAR_WIDTH = 40;
var CONTENT_X = CLOUD_X + BAR_WIDTH;

var drawRect = function (ctx, x, y, width, height, color) { //отрисовка прямоугольников
  ctx.fillStyle = color || '#000000';
  ctx.fillRect(x, y, width, height);
};

var drawText = function (ctx, text, x, y, color, font) { //отрисовка текста
  ctx.fillStyle = color || '#000000';
  ctx.font = font || '16px PT Mono';
  ctx.fillText(text, x, y);
};

var getMaxElement = function (arr) { //поиск максимального элемента
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  drawRect(ctx, CLOUD_OFFSET_X, CLOUD_OFFSET_Y, CLOUD_WIDTH, CLOUD_HEIGHT, 'rgba(0, 0, 0, 0.7)');
  drawRect(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, '#FFFFFF');
  drawText(ctx, 'Ура вы победили!', CLOUD_OFFSET_X + GAP, CLOUD_OFFSET_Y + GAP * 2);
  drawText(ctx, 'Список результатов:', CLOUD_OFFSET_X + GAP, (CLOUD_OFFSET_Y + GAP) * 2);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var barX = CONTENT_X + (BAR_WIDTH + BAR_GAP) * i;
    var barHeight = (BAR_MAX_HEIGHT * times[i]) / maxTime;
    var barY = CLOUD_HEIGHT - GAP * 2 - barHeight;

    drawText(ctx, Math.round(times[i]).toString(), barX, barY - GAP * 2);
    drawRect(ctx, barX, barY - GAP, BAR_WIDTH, barHeight, (players[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'hsl(240,' + (Math.random().toString() * 100) + '%,50%');
    drawText(ctx, players[i].toString(), barX, CLOUD_HEIGHT - GAP);
  }
};

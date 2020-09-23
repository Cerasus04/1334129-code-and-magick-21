'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var CONTENT_GAP = 20;
var TEXT_WIDTH = 50;
var BAR_WIDTH = 40;
var BAR_MAX_HEIGHT = 150;
var CONTENT_X = CLOUD_X + CONTENT_GAP;
var CLOUD_COLOR = 'rgb(255, 255, 255)';
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var CONTENT_OFFSET_X = CLOUD_X + GAP * 2;
var CONTENT_OFFSET_Y = CLOUD_Y + GAP * 2;

var renderCloud = function (ctx, x, y, width, height) {
  ctx.fillStyle = CLOUD_COLOR;
  ctx.shadowColor = SHADOW_COLOR;
  ctx.shadowOffsetX = GAP;
  ctx.shadowOffsetY = GAP;
  ctx.fillRect(x, y, width, height);
  ctx.shadowColor = 'rgba(0, 0, 0, 0)';
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

var setFontStyle = function (ctx, font, baseline, style) {
  ctx.font = font;
  ctx.textBaseline = baseline;
  ctx.fillStyle = style;
};

var drawHistogram = function (ctx, names, times) {
  var maxTime = getMaxElement(times);

  names.forEach(function (name, index) {
    var time = Math.floor(times[index]);
    var barX = CONTENT_X + (BAR_WIDTH + TEXT_WIDTH) * index;
    var barHeight = (BAR_MAX_HEIGHT * time) / maxTime;
    var barY = CLOUD_HEIGHT - CONTENT_GAP - GAP - barHeight;
    setFontStyle(ctx, '16px PT Mono', 'hanging', 'rgb(0, 0, 0)');

    ctx.fillText(name, barX, CLOUD_HEIGHT - CONTENT_GAP);
    ctx.fillText(time, barX, barY - CONTENT_GAP);
    ctx.fillStyle = name === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + Math.random() * 100 + '% , 50%)';
    ctx.fillRect(barX, barY, BAR_WIDTH, barHeight);
  });
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);
  setFontStyle(ctx, '16px PT Mono', 'hanging', 'rgb(0, 0, 0)');
  ctx.fillText('Ура вы победили!', CONTENT_OFFSET_X, CONTENT_OFFSET_Y);
  ctx.fillText('Список результатов:', CONTENT_OFFSET_X, (CONTENT_OFFSET_Y) * 2);
  drawHistogram(ctx, names, times);
};

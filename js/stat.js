var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHADOW_X = 110;
var SHADOW_Y = 20;
var GAP = 10;
var CONTENT_GAP = 50;
var BAR_WIDTH = 40;
var BAR_MAX_HEIGHT = 150;
var CONTENT_X = BAR_WIDTH + CONTENT_GAP;
var MESSAGE_HEIGHT = 50;
var TEXT_HEIGHT = 20;


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

window.renderStatistics = function (ctx, players, times) {
  renderCloud(
    ctx,
    SHADOW_X,
    SHADOW_Y,
    'rgba(0, 0, 0, 0.7)'
  );

  renderCloud(
    ctx,
    CLOUD_X,
    CLOUD_Y,
    '#fff'
  );

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 2);
  ctx.fillText('Список результатов:', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 4);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillText(
      Math.round(times[i]),
      CLOUD_X + BAR_WIDTH + CONTENT_X * i,
      CLOUD_Y + MESSAGE_HEIGHT + GAP + BAR_MAX_HEIGHT - BAR_MAX_HEIGHT * times[i] / maxTime
    );
    ctx.fillText(
      players[i],
      CLOUD_X + BAR_WIDTH + CONTENT_X * i,
      CLOUD_Y + MESSAGE_HEIGHT + GAP * 2 + TEXT_HEIGHT + BAR_MAX_HEIGHT
    );
  }

  for (var j = 0; j < players.length; j++) {
    if (players[j] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240, ' + Math.random() * 100 + '% , 50%)';
    }
    ctx.fillRect(
      CLOUD_X + BAR_WIDTH + CONTENT_X * j,
      CLOUD_Y + MESSAGE_HEIGHT + GAP + TEXT_HEIGHT + BAR_MAX_HEIGHT - BAR_MAX_HEIGHT * times[j] / maxTime,
      BAR_WIDTH,
      BAR_MAX_HEIGHT * times[j] / maxTime
    );
  }
};

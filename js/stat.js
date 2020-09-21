var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHADOW_X = 110;
var SHADOW_Y = 20;
var GAP = 10;
var CONTENT_GAP = 50; // расстояние между столбиками и подписями
var BAR_WIDTH = 40; //ширина столбца и ширина области подписи
var BAR_MAX_HEIGHT = 150; //максимальная высота столбца
var CONTENT_X = BAR_WIDTH + CONTENT_GAP; //начало текста по х = сдвиг окна по х + расстояние между именами
var MESSAGE_HEIGHT = 50; //высота подписи окна
var TEXT_HEIGHT = 20; //высота подписи на диагарамме


var renderCloud = function (ctx, x, y, color) { // рисуем облако
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) { //ищем максимальное значение
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
    SHADOW_X,
    SHADOW_Y,
    'rgba(0, 0, 0, 0.7)' //тень
  );

  renderCloud( //белое окно
    ctx,
    CLOUD_X,
    CLOUD_Y,
    '#fff'
  );

  ctx.fillStyle = '#000'; //цвет заливки уменя должен будет меняться
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 2);
  ctx.fillText('Список результатов:', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 4);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) { // Цикл в котором перебераются значения очков игроков для отрисовки имени
    ctx.fillText( //текст
      Math.round(times[i]),
      CLOUD_X + BAR_WIDTH + CONTENT_X * i,
      CLOUD_Y + MESSAGE_HEIGHT + GAP + BAR_MAX_HEIGHT - BAR_MAX_HEIGHT * times[i] / maxTime
    );
    ctx.fillText( //гистограмма
      players[i],
      CLOUD_X + BAR_WIDTH + CONTENT_X * i,
      CLOUD_Y + MESSAGE_HEIGHT + GAP * 2 + TEXT_HEIGHT + BAR_MAX_HEIGHT
    );
  }

  for (var j = 0; j < players.length; j++) { // Цикл для изменения цвета
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

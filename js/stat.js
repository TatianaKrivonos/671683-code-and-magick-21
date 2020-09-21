'use strict';
(function () {
  window.renderStatistics = function (ctx, players, times) {
    const CLOUD_WIDTH = 420;
    const CLOUD_HEIGHT = 270;
    const CANVAS_HEIGHT = 300;
    const CLOUD_X = 100;
    const CLOUD_Y = 10;
    const SHADOW_GAP = 10;
    const GAP = 50;
    const FONT_GAP = 16;
    const PADDING_X = 22;
    const PADDING_Y = 20;
    const BAR_HEIGHT = 150;
    const BAR_WIDTH = 40;
    const MIN_SATURATION = 20;
    const textArr = ['Ура вы победили!', 'Список результатов:'];

    const renderCloud = function (x, y, color) {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
    };

    const getMaxElement = function (arr) {
      let maxElement = arr[0];

      for (let i = 1; i < arr.length; i++) {
        if (arr[i] > maxElement) {
          maxElement = arr[i];
        }
      }

      return maxElement;
    };

    renderCloud(
        CLOUD_X + SHADOW_GAP,
        CLOUD_Y + SHADOW_GAP,
        'rgba(0, 0, 0, 0.7)'
    );
    renderCloud(
        CLOUD_X,
        CLOUD_Y,
        '#fff'
    );

    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.textBaseline = 'hanging';
    textArr.forEach((item, index) => {
      ctx.fillText(item, CLOUD_X + PADDING_X, CLOUD_Y + PADDING_Y * (index + 1));
    });

    const maxTime = getMaxElement(times);

    players.forEach((player, index) => {
      ctx.fillText(
          player,
          CLOUD_X + GAP + (GAP + BAR_WIDTH) * index,
          CLOUD_HEIGHT - FONT_GAP
      );
      ctx.fillText(
          Math.round(times[index]),
          CLOUD_X + GAP + (GAP + BAR_WIDTH) * index,
          CLOUD_HEIGHT - (FONT_GAP * 3) - BAR_HEIGHT
      );
      ctx.save();
      ctx.translate(0, CANVAS_HEIGHT);
      ctx.rotate(-Math.PI / 2);
      if (player === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        let randSaturation = Math.max(Math.floor(Math.random() * 100), MIN_SATURATION);
        ctx.fillStyle = `hsl(240, ${randSaturation}%, 50%)`;
      }
      ctx.fillRect(
          CLOUD_Y + GAP,
          CLOUD_X + GAP + (GAP + BAR_WIDTH) * index,
          (BAR_HEIGHT * times[index]) / maxTime,
          BAR_WIDTH
      );
      ctx.restore();
    });
  };
})();

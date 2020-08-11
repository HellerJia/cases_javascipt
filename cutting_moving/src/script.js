const gameWindow = document.getElementById('game-main-window');
const gameCanvas = gameWindow.getContext('2d');

const itemsPorperty = { lineNum: 3, columnNum: 3 };
const gameWindowItemSize = { gameWindowItemWidth: 0, gameWindowItemHeight: 0 };
const pictureItemsArray = new Array(0);
let sliceWidth;
let sliceHeight;
const img = new Image();
img.src = 'bg.png';

let isUpLoaded = false;
let selectItem = null;
let isFinish = false;
let step = 0;

function initImgSlice() {
  sliceWidth = img.width / itemsPorperty.columnNum;
  sliceHeight = img.height / itemsPorperty.lineNum;
  gameWindowItemSize.gameWindowItemWidth = gameWindow.clientWidth / itemsPorperty.columnNum;
  gameWindowItemSize.gameWindowItemHeight = gameWindow.clientHeight / itemsPorperty.lineNum;
}

function randomIndex() {
  pictureItemsArray.length = 0;
  for (let i = 0; i < itemsPorperty.columnNum * itemsPorperty.lineNum;) {
    const ran = Math.floor(Math.random() * 9);
    let exist = false;
    for (let j = 0; j < i; j++) {
      if (ran === pictureItemsArray[j]) {
        exist = true;
        break;
      }
    }
    if (!exist) {
      pictureItemsArray.push(ran);
      i++;
    }
  }
}

function gamePint(fix, x, y) {
  gameCanvas.clearRect(0, 0, gameWindow.width, gameWindow.height);
  for (let i = 0; i < itemsPorperty.columnNum * itemsPorperty.lineNum; i++) {
    if (i !== fix) {
      gameCanvas.drawImage(img,
        Math.floor(pictureItemsArray[i] % itemsPorperty.columnNum) * sliceWidth,
        Math.floor(pictureItemsArray[i] / itemsPorperty.lineNum) * sliceHeight,
        sliceWidth,
        sliceHeight,
        Math.floor(i % itemsPorperty.columnNum) * gameWindowItemSize.gameWindowItemWidth,
        Math.floor(i / itemsPorperty.lineNum) * gameWindowItemSize.gameWindowItemHeight,
        gameWindowItemSize.gameWindowItemWidth,
        gameWindowItemSize.gameWindowItemHeight);
    }
  }
  gameCanvas.drawImage(img,
    Math.floor(pictureItemsArray[fix] % itemsPorperty.columnNum) * sliceWidth,
    Math.floor(pictureItemsArray[fix] / itemsPorperty.lineNum) * sliceHeight,
    sliceWidth,
    sliceHeight,
    x - gameWindowItemSize.gameWindowItemWidth / 2,
    y - gameWindowItemSize.gameWindowItemHeight / 2,
    gameWindowItemSize.gameWindowItemWidth,
    gameWindowItemSize.gameWindowItemHeight);
}

function checkFinishState() {
  for (let i = 0; i < itemsPorperty.columnNum * itemsPorperty.lineNum; i++) {
    if (pictureItemsArray[i] !== i) {
      return false;
    }
  }
  return true;
}

function itemLocateByMouse(x, y) {
  return Math.floor(x / gameWindowItemSize.gameWindowItemWidth)
    + Math.floor(y / gameWindowItemSize.gameWindowItemHeight) * itemsPorperty.columnNum;
}

function ActionOnMouseDown(e) {
  if (e.buttons !== 1 || isFinish) {
    selectItem = undefined;
    return;
  }
  selectItem = itemLocateByMouse(e.layerX, e.layerY);
}

function ActionOnMouseUp(e) {
  if (selectItem === undefined) {
    return;
  }
  const tmp = pictureItemsArray[selectItem];
  pictureItemsArray[selectItem] = pictureItemsArray[itemLocateByMouse(e.layerX, e.layerY)];
  pictureItemsArray[itemLocateByMouse(e.layerX, e.layerY)] = tmp;
  if (itemLocateByMouse(e.layerX, e.layerY) !== selectItem) {
    step++;
  }
  gamePint();
  document.getElementById('step').innerHTML = step;
  if (checkFinishState()) {
    isFinish = true;
    document.getElementById('result').innerHTML = 'Finish';
  } else {
    document.getElementById('result').innerHTML = '------';
  }
}

function ActionOnMouseMove(e) {
  if (e.buttons === 1) {
    gamePint(selectItem, e.layerX, e.layerY);
  }
}

function ActionRegistration(flag) {
  document.getElementById('result').innerHTML = '------';
  if (flag) {
    gameWindow.onmousedown = ActionOnMouseDown;
    gameWindow.onmouseup = ActionOnMouseUp;
    gameWindow.onmousemove = ActionOnMouseMove;
    step = 0;
    document.getElementById('step').innerHTML = step;
  } else {
    gameWindow.onmousedown = null;
    gameWindow.onmouseup = null;
    gameWindow.onmousemove = null;
    document.getElementById('step').innerHTML = '---';
  }
}

function gameStart() {
  if (!isUpLoaded) {
    return;
  }
  initImgSlice();
  randomIndex();
  gamePint();
  ActionRegistration(isUpLoaded);
  isFinish = false;
}

function uploadImg() {
  img.src = 'https://bit.ly/fcc-relaxing-cat';
  document.getElementById('aim-img').src = 'https://bit.ly/fcc-relaxing-cat';
  isUpLoaded = true;
}

function reset() {
  img.src = 'bg.png';
  document.getElementById('aim-img').src = 'bg.png';
  gameCanvas.clearRect(0, 0, gameWindow.width, gameWindow.height);
  isUpLoaded = false;
  ActionRegistration(isUpLoaded);
}

document.getElementById('upload-button').onclick = uploadImg;
document.getElementById('reset-button').onclick = reset;
document.getElementById('start-button').onclick = gameStart;

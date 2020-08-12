const gameWindow = document.getElementById('game-main-window');
const gameCanvas = gameWindow.getContext('2d');

const itemsProperty = { lineNum: 3, columnNum: 3 };
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
  sliceWidth = img.width / itemsProperty.columnNum;
  sliceHeight = img.height / itemsProperty.lineNum;
  gameWindowItemSize.gameWindowItemWidth = gameWindow.clientWidth / itemsProperty.columnNum;
  gameWindowItemSize.gameWindowItemHeight = gameWindow.clientHeight / itemsProperty.lineNum;
}

function randomIndex() {
  pictureItemsArray.length = 0;
  for (let i = 0; i < itemsProperty.columnNum * itemsProperty.lineNum;) {
    const ran = Math.floor(Math.random() * itemsProperty.columnNum * itemsProperty.lineNum);
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

function gamePaint(fix, x, y) {
  gameCanvas.clearRect(0, 0, gameWindow.width, gameWindow.height);
  for (let i = 0; i < itemsProperty.columnNum * itemsProperty.lineNum; i++) {
    if (i !== fix) {
      gameCanvas.drawImage(img,
        Math.floor(pictureItemsArray[i] % itemsProperty.columnNum) * sliceWidth,
        Math.floor(pictureItemsArray[i] / itemsProperty.columnNum) * sliceHeight,
        sliceWidth,
        sliceHeight,
        Math.floor(i % itemsProperty.columnNum) * gameWindowItemSize.gameWindowItemWidth,
        Math.floor(i / itemsProperty.columnNum) * gameWindowItemSize.gameWindowItemHeight,
        gameWindowItemSize.gameWindowItemWidth,
        gameWindowItemSize.gameWindowItemHeight);
    }
  }
  if (fix !== undefined) {
    gameCanvas.drawImage(img,
      Math.floor(pictureItemsArray[fix] % itemsProperty.columnNum) * sliceWidth,
      Math.floor(pictureItemsArray[fix] / itemsProperty.columnNum) * sliceHeight,
      sliceWidth,
      sliceHeight,
      x - gameWindowItemSize.gameWindowItemWidth / 2,
      y - gameWindowItemSize.gameWindowItemHeight / 2,
      gameWindowItemSize.gameWindowItemWidth,
      gameWindowItemSize.gameWindowItemHeight);
  }
}

function checkFinishState() {
  for (let i = 0; i < itemsProperty.columnNum * itemsProperty.lineNum; i++) {
    if (pictureItemsArray[i] !== i) {
      return false;
    }
  }
  return true;
}

function itemLocateByMouse(x, y) {
  return Math.floor(x / gameWindowItemSize.gameWindowItemWidth)
    + Math.floor(y / gameWindowItemSize.gameWindowItemHeight) * itemsProperty.columnNum;
}

function ActionOnMouseUp(e) {
  if (selectItem === null) {
    return;
  }
  const tmp = pictureItemsArray[selectItem];
  pictureItemsArray[selectItem] = pictureItemsArray[itemLocateByMouse(e.layerX, e.layerY)];
  pictureItemsArray[itemLocateByMouse(e.layerX, e.layerY)] = tmp;
  if (itemLocateByMouse(e.layerX, e.layerY) !== selectItem) {
    step++;
  }
  gamePaint();
  document.getElementById('step').innerHTML = step;
  if (checkFinishState()) {
    isFinish = true;
    document.getElementById('result').innerHTML = 'Finish';
  } else {
    document.getElementById('result').innerHTML = '------';
  }
  selectItem = null;
  gameWindow.onmouseup = null;
  gameWindow.onmousemove = null;
}

function ActionOnMouseMove(e) {
  if (e.buttons === 1) {
    gamePaint(selectItem, e.layerX, e.layerY);
  }
}

function ActionOnMouseDown(e) {
  if (e.buttons !== 1 || isFinish) {
    selectItem = null;
    return;
  }
  selectItem = itemLocateByMouse(e.layerX, e.layerY);
  gameWindow.onmouseup = ActionOnMouseUp;
  gameWindow.onmousemove = ActionOnMouseMove;
}

function ActionRegistration(flag) {
  document.getElementById('result').innerHTML = '------';
  if (flag) {
    gameWindow.onmousedown = ActionOnMouseDown;
    step = 0;
    document.getElementById('step').innerHTML = step;
  } else {
    gameWindow.onmousedown = null;
    document.getElementById('step').innerHTML = '---';
  }
}

function updateItemsProperty() {
  const columnInput = Math.floor(Number(document.getElementById('column-input').value));
  const lineInput = Math.floor(Number(document.getElementById('line-input').value));
  if (columnInput > 1 && lineInput > 1) {
    itemsProperty.columnNum = columnInput;
    itemsProperty.lineNum = lineInput;
  }
}

function gameStart() {
  if (!isUpLoaded) {
    return;
  }
  updateItemsProperty();
  initImgSlice();
  randomIndex();
  gamePaint();
  ActionRegistration(isUpLoaded);
  isFinish = false;
}

function uploadImg() {
  // img.src = 'https://bit.ly/fcc-relaxing-cat';
  // document.getElementById('aim-img').src = 'https://bit.ly/fcc-relaxing-cat';
  if (this.files.length > 0) {
    img.src = window.URL.createObjectURL(this.files.item(0));
    document.getElementById('aim-img').src = window.URL.createObjectURL(this.files.item(0));
    isUpLoaded = true;
  }
}

function uploadFile() {
  document.getElementById('upload-file').click();
}

function reset() {
  gameCanvas.clearRect(0, 0, gameWindow.width, gameWindow.height);
  ActionRegistration(false);
}

document.getElementById('upload-button').onclick = uploadFile;
document.getElementById('upload-file').onchange = uploadImg;
document.getElementById('reset-button').onclick = reset;
document.getElementById('start-button').onclick = gameStart;

/* global main */

function ItemOpt() {
  const mBox = document.getElementById('m-grid-box');

  function itemOnSelect() {
    this.style.backgroundColor = '#eeeeee';
  }

  function areaSelectedClear() {
    for (let j = 3; j < mBox.childElementCount; j++) {
      for (let i = 1; i < mBox.children[j].childElementCount; i++) {
        mBox.children[j].children[i].unSelect();
      }
    }
  }

  function areaSelect(x, y, tx, ty) {
    areaSelectedClear();
    for (let j = y; j <= ty; j++) {
      for (let i = x; i <= tx; i++) {
        mBox.children[j + 3].children[i + 1].select();
      }
    }
  }

  function itemUnSelect() {
    this.style.backgroundColor = '#ffffff';
  }

  function itemOnDblClick() {
    this.readOnly = false;
  }

  function itemOnBlur() {
    this.style.backgroundColor = '#ffffff';
    this.removeEventListener('click', itemOnSelect);
    this.removeEventListener('dblclick', itemOnDblClick);
    this.removeEventListener('blur', itemOnBlur);
  }

  function itemOnFocus() {
    this.readOnly = true;
    areaSelectedClear();
    this.addEventListener('click', itemOnSelect, false);
    this.addEventListener('dblclick', itemOnDblClick, false);
    this.addEventListener('blur', itemOnBlur, false);
  }

  function itemOnMouseMove(e) {
    mBox.selectTargetItem = { x: e.target.x, y: e.target.y };
    areaSelect(Math.min(mBox.selectStartItem.x, mBox.selectTargetItem.x),
      Math.min(mBox.selectStartItem.y, mBox.selectTargetItem.y),
      Math.max(mBox.selectStartItem.x, mBox.selectTargetItem.x),
      Math.max(mBox.selectStartItem.y, mBox.selectTargetItem.y));
  }

  function itemOnMouseUp() {
    mBox.onmousemove = null;
    mBox.onmouseup = null;
  }

  function itemOnMouseDown(e) {
    mBox.onmousemove = itemOnMouseMove;
    mBox.onmouseup = itemOnMouseUp;
    mBox.selectStartItem = { x: e.target.x, y: e.target.y };
  }

  this.itemInit = (i) => {
    const item = i;
    item.select = itemOnSelect;
    item.unSelect = itemUnSelect;
    item.addEventListener('focus', itemOnFocus, false);
    item.addEventListener('mousedown', itemOnMouseDown, false);
  };

  this.selectLine = () => {
    console.log(this);
    areaSelect(0, this.num, document.getElementById('column-count').count, this.num);
  };

  this.selectColumn = () => {
    console.log(this);
    areaSelect(this.num, 0, this.num, document.getElementById('line-count').count);
  };

  mBox.onkeydown = (e) => {
    if (e.ctrlKey && e.keyCode === 65) {
      areaSelect(0, 0, document.getElementById('column-count').count - 1, document.getElementById('line-count').count - 1);
    }
  };
}

main.itemOpt = new ItemOpt();

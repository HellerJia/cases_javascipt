/* global main */

function ItemSelector() {
  const { mBox } = main;

  function selectByArea(sx, sy, tx, ty) {
    for (let i = 1; i <= mBox.columnList.length; i++) {
      for (let j = 1; j <= mBox.rowList.length; j++) {
        mBox.getItemByXY(i, j).isSelectByArea = i >= sx && i <= tx && j >= sy && j <= ty;
      }
    }
  }
  this.selectByArea = selectByArea;

  function onSelect(ref) {
    return (e) => {
      const sx = Math.min(ref.target.pColumn.index, e.target.pColumn.index);
      const sy = Math.min(ref.target.pRow.index, e.target.pRow.index);
      const tx = Math.max(ref.target.pColumn.index, e.target.pColumn.index);
      const ty = Math.max(ref.target.pRow.index, e.target.pRow.index);
      selectByArea(sx, sy, tx, ty);
      main.gridRender.renderSelectionState();
    };
  }

  this.itemSelectRegister = (it) => {
    const item = it;
    item.onmousedown = (e) => {
      mBox.onmousemove = onSelect(e);
      mBox.onmouseup = () => {
        mBox.onmousemove = null;
        mBox.onmouseup = null;
      };
    };
    item.ondblclick = () => {
      mBox.inputState = true;
      main.gridRender.renderSelectionState();
    };
  };
  this.itemSelectDisRegister = (it) => {
    const item = it;
    item.onmousedown = null;
    item.ondblclick = null;
  };

  this.columnSelectRegister = (c) => {
    const cb = c;
    const col = c.target;
    cb.onclick = () => {
      if (col.columnWidth !== undefined) selectByArea(col.index, 1, col.index, mBox.rowList.length);
      else selectByArea(1, col.index, mBox.columnList.length, col.index);
      main.gridRender.renderSelectionState();
    };
    cb.oncontextmenu = (e) => {
      e.preventDefault();
      const menuBox = document.getElementById('menu-box');
      menuBox.index = e.target.target.index;
      if (col.columnWidth !== undefined) {
        menuBox.children[0].innerHTML = 'Insert Column';
        menuBox.children[1].innerHTML = 'Delete Column';
        menuBox.targetType = 'column';
      } else {
        menuBox.children[0].innerHTML = 'Insert Row';
        menuBox.children[1].innerHTML = 'Delete Row';
        menuBox.targetType = 'row';
      }
      menuBox.style.left = `${e.clientX}px`;
      menuBox.style.top = `${e.clientY}px`;
      menuBox.style.display = 'block';
      mBox.onclick = () => { menuBox.style.display = 'none'; };
      menuBox.onclick = () => { menuBox.style.display = 'none'; };
    };
  };
  this.columnSelectDisRegister = (c) => {
    const cb = c;
    cb.onclick = null;
    cb.oncontextmenu = null;
  };
}

main.itemSelector = new ItemSelector();

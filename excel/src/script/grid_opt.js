/* global main */

function GridOpt() {
  function onResize(type, b, ref) {
    const button = b;
    if (type === 'row') {
      const curH = document.getElementById('m-grid-box').children[button.index].children[0].clientHeight;
      const curTop = parseInt(window.getComputedStyle(button, null).getPropertyValue('margin-top'), 10);
      return (e) => {
        const dtH = e.clientY - ref.clientY;
        const resH = dtH + curH >= 20 ? (dtH + curH) : 20;
        for (let i = 0; i <= document.getElementById('column-count').count; i++) {
          document.getElementById('m-grid-box').children[button.index].children[i].style.height = `${resH}px`;
        }
        const resTop = dtH + curTop >= 17 ? (dtH + curTop) : 17;
        button.style.marginTop = `${resTop}px`;
      };
    }
    const curW = document.getElementById('m-grid-box').children[2].children[button.index].clientWidth;
    const curLeft = parseInt(window.getComputedStyle(button, null).getPropertyValue('margin-left'), 10);
    return (e) => {
      const dtW = e.clientX - ref.clientX;
      const resW = dtW + curW >= 20 ? (dtW + curW) : 20;
      for (let i = 2; i < document.getElementById('line-count').count + 3; i++) {
        document.getElementById('m-grid-box').children[i].children[button.index].style.width = `${resW}px`;
      }
      const resLeft = dtW + curLeft >= 15 ? (dtW + curLeft) : 15;
      button.style.marginLeft = `${resLeft}px`;
    };
  }

  function newItem(x, y, width, height) {
    const item = document.createElement('input');
    item.type = 'text';
    item.className = 'default-border default-item-size item';
    item.style.height = `${height}px`;
    item.style.width = `${width}px`;
    item.x = x;
    item.y = y;
    main.itemOpt.itemInit(item);
    return item;
  }

  function newLineHeader() {
    const lineHeader = document.createElement('a');
    lineHeader.className = 'line-header default-border default-item-size';
    lineHeader.innerHTML = document.getElementById('line-count').count + 1;
    lineHeader.num = document.getElementById('line-count').count;
    lineHeader.onclick = main.itemOpt.selectLine;
    return lineHeader;
  }

  function newResizeHeightButton() {
    const button = document.createElement('button');
    button.className = 'resize-height-button line-header';
    button.index = document.getElementById('line-count').count + 3;
    button.onmousedown = (e) => {
      document.getElementById('m-grid-box').onmousemove = onResize('row', button, e);
      document.getElementById('m-grid-box').onmouseup = () => {
        document.getElementById('m-grid-box').onmousemove = null;
        document.getElementById('m-grid-box').onmouseup = null;
      };
    };
    return button;
  }

  function NewLine() {
    const nLine = document.createElement('div');
    const lc = document.getElementById('line-count');
    const lastLine = document.getElementById('m-grid-box').children[lc.count + 2];
    nLine.className = 'flex-row';
    nLine.appendChild(newLineHeader());
    for (let i = 0; i < document.getElementById('column-count').count; i++) {
      nLine.appendChild(
        newItem(i, lc.count, lastLine.children[i + 1].clientWidth, 22),
      );
    }
    document.getElementById('m-grid-box').appendChild(nLine);
    document.getElementById('resize-height-button-box').appendChild(newResizeHeightButton());
    lc.innerHTML = ++lc.count;
  }

  function newColumnHeader() {
    const columnHeader = document.createElement('a');
    columnHeader.className = 'column-header default-border default-item-size';
    columnHeader.innerHTML = document.getElementById('column-count').count + 1;
    columnHeader.num = document.getElementById('column-count').count;
    columnHeader.onclick = main.itemOpt.selectColumn;
    return columnHeader;
  }

  function newResizeWidthButton() {
    const button = document.createElement('button');
    button.className = 'resize-width-button column-header';
    button.index = document.getElementById('column-count').count + 1;
    button.onmousedown = (e) => {
      document.getElementById('m-grid-box').onmousemove = onResize('column', button, e);
      document.getElementById('m-grid-box').onmouseup = () => {
        document.getElementById('m-grid-box').onmousemove = null;
      };
    };
    return button;
  }

  function NewColumn() {
    document.getElementById('column-headers').appendChild(newColumnHeader());
    document.getElementById('resize-width-button-box').appendChild(newResizeWidthButton());
    const mBox = document.getElementById('m-grid-box');
    const cc = document.getElementById('column-count');
    for (let i = 3; i < mBox.childElementCount; i++) {
      mBox.children[i].appendChild(
        newItem(cc.count, i - 3, 70, mBox.children[i].lastChild.clientHeight),
      );
    }
    cc.innerHTML = ++cc.count;
  }

  document.getElementById('line-count').count = 0;
  document.getElementById('line-count').innerHTML = 0;
  document.getElementById('column-count').count = 0;
  document.getElementById('column-count').innerHTML = 0;
  document.getElementById('new-line-button').addEventListener('click', NewLine, false);
  document.getElementById('new-column-button').addEventListener('click', NewColumn, false);
}

main.gridOpt = GridOpt();

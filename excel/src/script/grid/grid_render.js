/* global main */

function GridRender() {
  const { mBox } = main;
  const reHeightBox = document.getElementById('resize-height-button-box');
  const reWidthBox = document.getElementById('resize-width-button-box');

  function getFirstElementByIndex(pE, idx) {
    for (let i = 0; i < pE.childElementCount; i++) {
      if (pE.children[i].target.index === idx) {
        return pE.children[i];
      }
    }
    return null;
  }

  mBox.getItemByXY = (x, y) => mBox.rowList[y - 1].children[x];

  function resetIndex(array) {
    for (let i = 0; i < array.length; i++) {
      const e = array[i];
      e.index = i + 1;
      e.header.innerHTML = e.index;
    }
  }

  const defaultResizeButtonSize = 6;
  function renderHeader(c) {
    const curHeader = c.header;
    curHeader.innerHTML = c.index;
    if (c.rowHeight !== undefined) {
      curHeader.style.height = `${c.rowHeight}px`;
      curHeader.resizeArea.style.height = `${defaultResizeButtonSize}px`;
      curHeader.resizeArea.className = 'resize-height-button line-header line-header-button';
      curHeader.selectArea.style.height = `${c.rowHeight - defaultResizeButtonSize + 1}px`;
      curHeader.selectArea.className = 'line-header line-header-button';
    }
    if (c.columnWidth !== undefined) {
      curHeader.style.width = `${c.columnWidth}px`;
      curHeader.resizeArea.style.width = `${defaultResizeButtonSize}px`;
      curHeader.resizeArea.className = 'resize-width-button column-header column-header-button';
      curHeader.selectArea.style.width = `${c.columnWidth - defaultResizeButtonSize + 1}px`;
      curHeader.selectArea.className = 'column-header column-header-button';
    }
  }
  function renderItems(c) {
    const item = c;
    item.style.height = `${c.pRow.rowHeight}px`;
    item.style.width = `${c.pColumn.columnWidth}px`;
  }
  function renderNewRow(nRow) {
    const row = nRow;
    row.className = 'flex-row';
    renderHeader(row);
    row.header.className = 'line-header default-border default-item-size';
    for (let i = 1; i <= mBox.columnList.length; i++) {
      const item = mBox.getItemByXY(i, nRow.index);
      renderItems(item);
      item.className = 'default-border default-item-size item';
    }
  }

  function fillRowItems(nRow) {
    nRow.appendChild(nRow.header);
    for (let i = 0; i < mBox.columnList.length; i++) {
      nRow.appendChild(
        main.itemConstructor.newItem(nRow, mBox.columnList[i]),
      );
    }
  }
  this.fillNewRow = (nRow) => {
    fillRowItems(nRow);
    mBox.rowList.splice(nRow.index - 1, 0, nRow);
    if (nRow.index >= mBox.rowList.length) {
      mBox.appendChild(nRow);
      reHeightBox.appendChild(nRow.header.selectArea);
      reHeightBox.appendChild(nRow.header.resizeArea);
    } else {
      mBox.insertBefore(nRow, mBox.rowList[nRow.index]);
      const nextE = getFirstElementByIndex(reHeightBox, nRow.index);
      reHeightBox.insertBefore(nRow.header.selectArea, nextE);
      reHeightBox.insertBefore(nRow.header.resizeArea, nextE);
    }
    renderNewRow(nRow);
    resetIndex(mBox.rowList);
  };

  function renderNewColumn(nCol) {
    const col = nCol;
    renderHeader(col);
    col.header.className = 'column-header default-border default-item-size';
    for (let i = 1; i <= mBox.rowList.length; i++) {
      const item = mBox.getItemByXY(col.index, i);
      renderItems(item);
      item.className = 'default-border default-item-size item';
    }
  }
  this.fillNewColumn = (nCol) => {
    mBox.columnList.splice(nCol.index - 1, 0, nCol);
    if (nCol.index >= mBox.columnList.length) {
      const columnHeaders = document.getElementById('column-headers');
      columnHeaders.appendChild(nCol.header);
      reWidthBox.appendChild(nCol.header.selectArea);
      reWidthBox.appendChild(nCol.header.resizeArea);
      for (let i = 0; i < mBox.rowList.length; i++) {
        mBox.rowList[i].appendChild(
          main.itemConstructor.newItem(mBox.rowList[i], nCol),
        );
      }
    } else {
      const columnHeaders = document.getElementById('column-headers');
      columnHeaders.insertBefore(nCol.header, columnHeaders.children[nCol.index]);
      const nextE = getFirstElementByIndex(reWidthBox, nCol.index);
      reWidthBox.insertBefore(nCol.header.selectArea, nextE);
      reWidthBox.insertBefore(nCol.header.resizeArea, nextE);
      for (let i = 0; i < mBox.rowList.length; i++) {
        mBox.rowList[i].insertBefore(
          main.itemConstructor.newItem(mBox.rowList[i], nCol),
          mBox.rowList[i].children[nCol.index],
        );
      }
    }
    renderNewColumn(nCol);
    resetIndex(mBox.columnList);
  };

  this.renderRowHeight = (idx) => {
    const row = mBox.rowList[idx - 1];
    row.header.style.height = `${row.rowHeight}px`;
    row.header.selectArea.style.height = `${row.rowHeight - row.header.resizeArea.clientHeight + 1}px`;
    for (let i = 1; i <= mBox.columnList.length; i++) {
      const item = mBox.getItemByXY(i, idx);
      renderItems(item);
    }
  };
  this.renderColumnWidth = (idx) => {
    const col = mBox.columnList[idx - 1];
    col.header.style.width = `${col.columnWidth}px`;
    col.header.selectArea.style.width = `${col.columnWidth - col.header.resizeArea.clientWidth + 1}px`;
    for (let i = 1; i <= mBox.rowList.length; i++) {
      const item = mBox.getItemByXY(idx, i);
      renderItems(item);
    }
  };

  this.renderSelectionState = () => {
    for (let i = 1; i <= mBox.columnList.length; i++) {
      for (let j = 1; j <= mBox.rowList.length; j++) {
        const item = mBox.getItemByXY(i, j);
        if (item.isSelectByArea) item.style.backgroundColor = '#cccccc';
        else item.style.backgroundColor = '#ffffff';
      }
    }
    if (mBox.selectItemIdx !== undefined) {
      const mainItem = mBox.getItemByXY(mBox.selectItemIdx.x, mBox.selectItemIdx.y);
      mainItem.style.backgroundColor = '#eeeeee';
      mainItem.readOnly = !mBox.inputState;
    }
  };

  function removeHeader(element) {
    const h = element.header;
    const hs = h.selectArea;
    const hr = h.resizeArea;
    h.parentNode.removeChild(h);
    hs.parentNode.removeChild(hs);
    hr.parentNode.removeChild(hr);
  }
  this.removeColumn = (idx) => {
    removeHeader(mBox.columnList[idx - 1]);
    for (let i = 1; i <= mBox.rowList.length; i++) {
      const cur = mBox.getItemByXY(idx, i);
      cur.parentNode.removeChild(cur);
    }
    mBox.columnList.splice(idx - 1, 1);
    resetIndex(mBox.columnList);
  };
  this.removeRow = (idx) => {
    const cur = mBox.rowList[idx - 1];
    removeHeader(cur);
    cur.parentNode.removeChild(cur);
    mBox.rowList.splice(idx - 1, 1);
    resetIndex(mBox.rowList);
  };
}

main.gridRender = new GridRender();

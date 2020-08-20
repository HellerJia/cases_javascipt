/* global main */

function GridConstructor() {
  const { mBox } = main;

  mBox.columnList = [];
  mBox.rowList = [];

  const defaultSize = { width: 70, height: 22 };

  function newHeader(target) {
    const nHeader = document.createElement('p');
    nHeader.selectArea = document.createElement('div');
    nHeader.selectArea.id = 'select-area';
    nHeader.selectArea.target = target;
    nHeader.resizeArea = document.createElement('div');
    nHeader.resizeArea.id = 'resize-area';
    nHeader.resizeArea.target = target;
    return nHeader;
  }

  this.newRow = (idx) => {
    const nRow = document.createElement('div');
    nRow.index = idx;
    nRow.rowHeight = defaultSize.height;
    nRow.header = newHeader(nRow);
    return nRow;
  };

  this.newColumn = (idx) => {
    const nColumn = {
      columnWidth: defaultSize.width,
    };
    nColumn.header = newHeader(nColumn);
    nColumn.index = idx;
    return nColumn;
  };
}

main.gridConstructor = new GridConstructor();

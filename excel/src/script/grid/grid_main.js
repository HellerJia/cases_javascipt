/* global main */

const { mBox } = main;

document.getElementById('new-line-button').addEventListener('click', () => {
  main.gridRender.fillNewRow(
    main.gridConstructor.newRow(document.getElementById('m-grid-box').rowList.length + 1),
  );
}, false);
document.getElementById('new-column-button').addEventListener('click', () => {
  main.gridRender.fillNewColumn(
    main.gridConstructor.newColumn(document.getElementById('m-grid-box').columnList.length + 1),
  );
}, false);

document.getElementById('insert-line-button').addEventListener('click', () => {
  const idx = parseInt(document.getElementById('insert-line-idx').value, 10);
  if (!idx || idx <= 0 || idx > mBox.rowList.length + 1) {
    alert('invalid input');
    return;
  }
  main.gridRender.fillNewRow(
    main.gridConstructor.newRow(idx),
  );
}, false);
document.getElementById('insert-column-button').addEventListener('click', () => {
  const idx = parseInt(document.getElementById('insert-column-idx').value, 10);
  if (!idx || idx <= 0 || idx > mBox.columnList.length + 1) {
    alert('invalid input');
    return;
  }
  main.gridRender.fillNewColumn(
    main.gridConstructor.newColumn(idx),
  );
}, false);
document.getElementById('delete-line-button').addEventListener('click', () => {
  const idx = parseInt(document.getElementById('delete-line-idx').value, 10);
  if (!idx || idx <= 0 || idx > mBox.rowList.length) {
    alert('invalid input');
    return;
  }
  main.gridRender.removeRow(idx);
}, false);
document.getElementById('delete-column-button').addEventListener('click', () => {
  const idx = parseInt(document.getElementById('delete-column-idx').value, 10);
  if (!idx || idx <= 0 || idx > mBox.columnList.length) {
    alert('invalid input');
    return;
  }
  main.gridRender.removeColumn(idx);
}, false);

document.getElementById('insert-menu').addEventListener('click', () => {
  const menuBox = document.getElementById('menu-box');
  if (menuBox.targetType === 'column') {
    main.gridRender.fillNewColumn(
      main.gridConstructor.newColumn(menuBox.index),
    );
  } else {
    main.gridRender.fillNewRow(
      main.gridConstructor.newRow(menuBox.index),
    );
  }
}, false);
document.getElementById('delete-menu').addEventListener('click', () => {
  const menuBox = document.getElementById('menu-box');
  if (menuBox.targetType === 'column') {
    main.gridRender.removeColumn(menuBox.index);
  } else {
    main.gridRender.removeRow(menuBox.index);
  }
}, false);

mBox.actionDisRegister = () => {};
mBox.addEventListener('mousedown', (e) => {
  mBox.actionDisRegister();
  switch (e.target.id) {
    case 'item':
      main.itemSelector.itemSelectRegister(e.target);
      mBox.actionDisRegister = () => { main.itemSelector.itemSelectDisRegister(e.target); };
      break;
    case 'resize-area':
      main.gridResize.onResizeRegister(e.target);
      mBox.actionDisRegister = () => { main.gridResize.onResizeDisRegister(e.target); };
      break;
    case 'select-area':
      main.itemSelector.columnSelectRegister(e.target);
      mBox.actionDisRegister = () => { main.itemSelector.columnSelectDisRegister(e.target); };
      break;
    default:
      break;
  }
}, true);

mBox.inputState = false;
mBox.addEventListener('mousedown', (e) => {
  mBox.inputState = false;
  main.itemSelector.selectByArea(0, 0, 0, 0);
  if (e.target.pColumn !== undefined && e.target.pRow !== undefined) {
    mBox.selectItemIdx = { x: e.target.pColumn.index, y: e.target.pRow.index };
  } else {
    mBox.selectItemIdx = undefined;
  }
  main.gridRender.renderSelectionState();
}, true);

mBox.addEventListener('keypress', (e) => {
  switch (e.keyCode) {
    case 32:
      if (mBox.selectItemIdx !== undefined) {
        mBox.inputState = true;
        main.gridRender.renderSelectionState();
      }
      break;

    default:
      break;
  }
});

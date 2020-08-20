/* global main */

function ItemConstructor() {
  this.newItem = (row, column) => {
    const i = document.createElement('input');
    i.type = 'text';
    i.id = 'item';
    i.pRow = row;
    i.pColumn = column;
    return i;
  };
}

main.itemConstructor = new ItemConstructor();

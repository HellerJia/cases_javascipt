/* global main */

function GridResize() {
  function rowResize(b, ref) {
    const row = b.target;
    const curH = row.rowHeight;
    return (e) => {
      const dt = e.clientY - ref.clientY;
      row.rowHeight = curH + dt >= 20 ? (curH + dt) : 20;
      main.gridRender.renderRowHeight(row.index);
    };
  }

  function columnResize(b, ref) {
    const col = b.target;
    const curW = col.columnWidth;
    return (e) => {
      const dt = e.clientX - ref.clientX;
      col.columnWidth = curW + dt >= 20 ? (curW + dt) : 20;
      main.gridRender.renderColumnWidth(col.index);
    };
  }

  function onResize(b, ref) {
    if (b.target.rowHeight !== undefined) {
      return rowResize(b, ref);
    }
    return columnResize(b, ref);
  }

  this.onResizeRegister = (b) => {
    const button = b;
    button.onmousedown = (e) => {
      document.onmousemove = onResize(b, e);
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  };
  this.onResizeDisRegister = (b) => {
    const button = b;
    button.onmousedown = null;
  };
}

main.gridResize = new GridResize();

document.onkeydown = function() {
  if (event.keyCode <= 57 && event.keyCode >= 48) {
    inputNum(event.keyCode - 48);
  }
  if (event.keyCode <= 105 && event.keyCode >= 96) {
    inputNum(event.keyCode - 96);
  }
}
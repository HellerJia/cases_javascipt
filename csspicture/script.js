console.log("Hello World")
function mouseMove(ev) {
  ev = ev || window.event;
  var x = document.getElementsByClassName("eyeball");
  var dtbase = 340
  var dt = String(ev.clientX < 56 + dtbase ? (ev.clientX > dtbase ? ev.clientX-dtbase : 0) : 56) + "px";
  x[0].style.marginLeft = dt;
  x[1].style.marginLeft = dt;
}
document.onmousemove = mouseMove
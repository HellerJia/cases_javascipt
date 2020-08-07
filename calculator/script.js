function update() {
  var bodyHeight = document.getElementById("body").clientHeight;
  document.getElementById("calculator-body").style.marginTop = bodyHeight * 0.1 + "px";
  document.getElementById("calculator-body").style.height = (bodyHeight > 540 ? bodyHeight * 0.8 : 432) + "px";
  document.getElementById("calculator-main").style.height =
    document.getElementById("calculator-body").clientHeight -
    document.getElementById("calculator-header").clientHeight -
    document.getElementById("calculator-alt").clientHeight -
    document.getElementById("screen").clientHeight -
    document.getElementById("buttons-m").clientHeight + "px";

  document.getElementById("backspace").innerHTML = document.getElementById("backspace").clientWidth > 70 ? "BackSpace" : "Back...";
  var calBodyWidth = document.getElementById("calculator-body").clientWidth;
  document.documentElement.style.setProperty("--buttons-m-common-width",  (calBodyWidth > 300 ? calBodyWidth * 0.13 : 39) + "px");
}

window.onload = update
window.onresize = update

var data = {num: 0, opt: "", cacheNum: 0, cacheState: 0}
function inputNum(input) {
  if (data.cacheState == 1) {
    data.num = input;
  } else {
    data.num = data.num*10 + input;
  }
  updateScreen();
}

function updateScreen() {
  document.getElementById("screen-text").style.fontSize = data.num >= 1e+10 ? "20px" : "37px";
  document.getElementById("screen-text").innerHTML = data.num;
}

function clearNum() {
  data.num = 0;
  clearCache();
  updateScreen();
}

function clearCache() {
  data.opt = "";
  data.cacheState = 0;
  data.cacheNum = 0;
}

function inputOpt(input) {
  calculate();
  data.opt = input;
  data.cacheNum = data.num;
  data.cacheState = 1;

  debug(input);
}

function inputGo() {
  calculate();
  clearCache();
}

function calculate() {
  switch (data.opt) {
    case '+':
      data.num += data.cacheNum;
      break;
    case '-':
      data.num = data.cacheNum - data.num;
      break;
    case '*':
      data.num *= data.cacheNum;
      break;
    case '/':
      data.num = data.cacheNum / data.num;
      break;
  }
  updateScreen();

  debug();
}

function debug(input) {
  console.log("input: " + input)
  console.log(data)
}
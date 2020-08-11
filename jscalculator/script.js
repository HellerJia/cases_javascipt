function calculate() {
  var inputString = document.getElementById("input-text").value;
  document.getElementById("output").innerHTML = cal(inputString)
}

function getHGStr(inputString) {
  let mk = 0;
  let fhStack = [];
  let output = new Array();
  for (i = 0; i < inputString.length; i++) {
    if (inputString[i] == '+' || inputString[i] == '-' || inputString[i] == '*' || inputString[i] == '/' || inputString[i] == '(' || inputString[i] == ')') {
      if (mk !== i) {
        output.push(Number(inputString.substring(mk, i)));
      }
      mk = i+1;
      switch (inputString[i]) {
        case '(':
          fhStack.push(inputString[i]);
          break;
        case ')':
          while (true) {
            let cur = fhStack.pop();
            if (cur === '(') {
              break;
            }
            output.push(cur);
          }
          break;
        case '*': case '/':
          fhStack.push(inputString[i]);
          break;
        case '+': case '-':
          if (fhStack[fhStack.length-1] !== '*' && fhStack[fhStack.length-1] !== '/') {
            fhStack.push(inputString[i]);
          } else {
            while (fhStack.length !== 0 && fhStack[fhStack.length-1] !== '(') {
              output.push(fhStack.pop());
            }
            fhStack.push(inputString[i]);
          }
      }
    }
  }
  if (mk !== inputString.length) {
    output.push(Number(inputString.substring(mk)));
  }
  while (fhStack.length !== 0) {
    output.push(fhStack.pop());
  }
  return output;
}

function procHGStr(intput) {
  let numStack = [];
  intput.forEach(element => {
    if (typeof(element) === "number") {
      numStack.push(element);
    } else {
      let b = numStack.pop();
      let a = numStack.pop();
      switch (element) {
        case '+':
          numStack.push(a+b);
          break;
        case '-':
          numStack.push(a-b);
          break;
        case '*':
          numStack.push(a*b);
          break;
        case '/':
          numStack.push(a/b);
          break;
      }
    }
  });
  return numStack[0];
}

function cal(inputString) {
  let output = getHGStr(inputString);
  console.log(output);
  return procHGStr(output);
}
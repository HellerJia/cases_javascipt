class HttpRequest {
  constructor() {
    this.reqType = 'GET';
    this.reqURL = 'service.html';
    this.reqHeader = new Map();
    this.reqPostData = '';
  }

  updateReqType(t) {
    this.reqType = t;
  }

  updateReqURL(url) {
    this.reqURL = url;
  }

  updateReqPostData(data) {
    this.reqPostData = data;
  }

  addReqHeader(key, value) {
    if (key !== '' && value !== '') this.reqHeader.set(key, value);
  }

  fillReq(s) {
    s.open(this.reqType, this.reqURL, true);
    this.reqHeader.forEach((value, key) => {
      s.setRequestHeader(key, value);
    });
  }

  printReqText() {
    let output = `${this.reqType} ${this.reqURL}`;
    this.reqHeader.forEach((value, key) => {
      output += `<br/>${key}: ${value}`;
    });
    output += `<br/>${this.reqPostData}`;
    return output;
  }

  newReqPromise() {
    return new Promise((resolve, reject) => {
      const sender = new XMLHttpRequest();
      this.fillReq(sender);
      sender.onreadystatechange = () => {
        if (sender.readyState === 4) {
          if (sender.status === 200) {
            resolve(sender.responseText);
          }
          reject(new Error(sender.statusText));
        }
      };
      sender.send(this.reqPostData);
    }).then((rspText) => {
      document.getElementById('rsp-text').innerHTML = rspText;
    }, (error) => {
      console.log(error);
    });
  }

  async sendRequest() {
    await this.newReqPromise();
  }
}

let httpRequest = new HttpRequest();
document.getElementById('req-text').innerHTML = httpRequest.printReqText();

document.getElementById('req-type').onchange = (e) => {
  document.getElementById('post-data-p').style.display = e.target.value === 'POST' ? 'block' : 'none';
  httpRequest.updateReqType(e.target.value);
  document.getElementById('req-text').innerHTML = httpRequest.printReqText();
};

document.getElementById('req-url').onchange = (e) => {
  httpRequest.updateReqURL(e.target.value);
  document.getElementById('req-text').innerHTML = httpRequest.printReqText();
};

document.getElementById('post-data').onchange = (e) => {
  httpRequest.updateReqPostData(e.target.value);
  document.getElementById('req-text').innerHTML = httpRequest.printReqText();
};

document.getElementById('set-header-button').onclick = () => {
  httpRequest.addReqHeader(
    document.getElementById('header-key').value,
    document.getElementById('header-value').value,
  );
  document.getElementById('req-text').innerHTML = httpRequest.printReqText();
};

document.getElementById('clear-button').onclick = () => {
  httpRequest = new HttpRequest();
  document.getElementById('rsp-text').innerHTML = null;
  document.getElementById('req-text').innerHTML = httpRequest.printReqText();
};

document.getElementById('send-button').onclick = () => { httpRequest.sendRequest(); };

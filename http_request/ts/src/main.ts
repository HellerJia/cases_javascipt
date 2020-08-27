import { RequestHeader, HttpRequest } from './script.js';

class HttpClient {
  private reqUrl: string = 'service.html';
  private reqType: string;
  public rspBody: any = {};

  public UpdateReqType(t: string): void {
    this.reqType = t;
  }
  public UpdateReqURL(url: string): void {
    this.reqUrl = url;
  }

  public async SendReq() {
    await HttpRequest.SendRequest(new RequestHeader(this.reqUrl, this.reqType), this.rspBody);
  }
}

let httpClient = new HttpClient();

document.getElementById('req-type').onchange = (e) => {
  document.getElementById('post-data-p').style.display = (e.target as HTMLInputElement).value === 'POST' ? 'block' : 'none';
  httpClient.UpdateReqType((e.target as HTMLInputElement).value);
};

document.getElementById('req-url').onchange = (e) => {
  httpClient.UpdateReqURL((e.target as HTMLInputElement).value);
};

document.getElementById('clear-button').onclick = () => {
  httpClient = new HttpClient();
  document.getElementById('rsp-text').innerHTML = null;
};

document.getElementById('send-button').onclick = async () => {
  const rspText = await httpClient.SendReq();
  document.getElementById('rsp-text').innerHTML = rspText as any;
};

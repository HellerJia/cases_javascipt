export class RequestHeader {
  public url: string;
  public type: string;
  public headers: Map<string, string>;
  public constructor(url: string, type: string = 'GET', ...headers: {key: string, value: string}[]) {
    this.url = url;
    this.type = type;
    headers.forEach(({key, value}) => {
      if (key !== '' && value !== '') this.headers.set(key, value);
    })
  }
}

export class HttpRequest {
  private static newRequestPromise(header: RequestHeader, data?: string): Promise<void> {
    const sender: XMLHttpRequest = new XMLHttpRequest();
    sender.open(header.type, header.url, true);
    header.headers.forEach(([key, value]) => {
      sender.setRequestHeader(key, value);
    })
    return new Promise((resolve, reject) => {
      sender.onreadystatechange = () => {
        if (sender.readyState === 4) {
          if (sender.status >= 200 && sender.status <= 299) {
            resolve(sender.responseText as any);
          } else {
            reject(sender);
          }
        }
      };
      sender.send(data);
    });
  }

  public static async SendRequest(header: RequestHeader, out: any, data?: string): Promise<void> {
    await HttpRequest.newRequestPromise(header, data).then((value) => {
      out.responseText = value;
    }, (value) => {
      console.log(value);
    });
  }
}
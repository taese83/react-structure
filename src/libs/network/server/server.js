import network from 'libs/network/core/network';

class Builder {
  constructor() {
    this.header = {};
  }
  setHeader(name, value) {
    this.header[name] = value;
    return this;
  }
  build() {
    return new Header(this);
  }
}

export class Header {
  constructor(builder) {
    if (builder instanceof Builder) {
      this.header = builder.header;
    }
  }

  static get Builder() {
    return new Builder();
  }
}

export class Server {
  constructor(url) {
    this.url = url;
    this.header = {};
  }

  setHeader(header) {
    if (header instanceof Header) {
      this.header = header;
    }
  }

  request(path, method, queryParams, bodyData, configs) {
    network.request(
      `${this.url}${path}`,
      method,
      this.header,
      queryParams,
      bodyData,
      configs,
    );
  }

  get(path, queryParams, bodyData, configs) {
    return this.request(path, 'GET', queryParams, bodyData, configs);
  }

  post(path, queryParams, bodyData, configs) {
    return this.request(path, 'POST', queryParams, bodyData, configs);
  }

  put(path, queryParams, bodyData, configs) {
    return this.request(path, 'PUT', queryParams, bodyData, configs);
  }

  delete(path, queryParams, bodyData, configs) {
    return this.request(path, 'DELETE', queryParams, bodyData, configs);
  }
}

class Logger {
  constructor(module) {
    this.module = module;
    this.getPrefix = () => {
      return `${new Date().toGMTString()} | ${this.module} | `;
    };
  }

  log(payload) {
    console.log(`${this.getPrefix()}${payload}`);
  }
  info(payload) {
    console.log(`${this.getPrefix()}${payload}`);
  }

  warn(payload) {
    console.log(`${this.getPrefix()}${payload}`);
  }

  error(payload) {
    console.log(`${this.getPrefix()}${payload}`);
  }
}

export default Logger;

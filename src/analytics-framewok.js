import Logger from "./logger";

class AnalyticsFramewok {
  constructor(options) {
    this.options = options;
    this.logger = new Logger(this.options.moduleName);
    this.logger.info("Instanciated");
  }
}

export default AnalyticsFramewok;

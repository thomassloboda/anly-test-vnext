import Logger from "./logger";
import CustomIdentifier from "./custom-identifier";

class LocalStorage {
  constructor(prefix) {
    this.logger = new Logger("LocalStorage");
    this.isAvailable = window.localStorage;
    this.prefix = prefix;
    if (this.isAvailable) {
      this.logger.info("LocalStorage initialized");
    } else {
      this.logger.warn("LocalStorage unavailable");
    }
  }

  getClientId() {
    const now = new Date().getTime();
    if (this.isAvailable) {
      let stored = localStorage.getItem(`${this.prefix}.clientID`);
      if (stored) {
        stored = JSON.parse(stored);
        this.logger.info(`Retrieveing ${this.prefix}.clientID`);
        if (stored.expires > now) {
          return stored.value;
        }
      }
      stored = {
        value: `${this.prefix}.${CustomIdentifier.generate()}`,
        expires: new Date().getTime() + 13 * 2.628e9,
      };
      this.logger.info(`Creating ${this.prefix}.clientID`);
      localStorage.setItem(`${this.prefix}.clientID`, JSON.stringify(stored));
      return stored.value;
    }
    return CustomIdentifier.generate();
  }
}

export default LocalStorage;

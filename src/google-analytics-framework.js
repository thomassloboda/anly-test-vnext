import AnalyticsFramewok from "./analytics-framewok";
import LocalStorage from "./local-storage";

class GoogleAnalyticsFramework extends AnalyticsFramewok {
  constructor(options) {
    super({ ...options, moduleName: "GoogleAnalyticsFramework" });
    this.LocalStorage = new LocalStorage(this.options.storagePrefix);
  }

  init() {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://www.google-analytics.com/analytics.js";
      script.onload = () => {
        try {
          const ga = window.ga || function() {};
          this.logger.info("Script loaded");
          ga("create", this.options.accountID, this.options.domain, {
            name: `${this.options.prefix}`,
            cookie_domain: this.options.cookieDomain,
            siteSpeedSampleRate: 1,
            allowAnchor: true,
            cookieExpires: 33696000,
            clientId: this.LocalStorage.getClientId()
          });
          this.logger.info("GoogleAnalytics initialized");
          resolve();
        } catch (error) {
          reject(error);
        }
      };
      document.body.appendChild(script);
    });
  }

  setPagename(name) {
    try {
      const ga = window.ga || function() {};
      ga(`${this.options.prefix}.set`, "page", name);
      this.logger.info(`Current page set to ${name}`);
    } catch (error) {
      this.logger.error(error);
    }
  }

  sendPageview() {
    try {
      const ga = window.ga || function() {};
      ga(`${this.options.prefix}.send`, "pageview");
      this.logger.info("Pageview sent");
    } catch (error) {
      this.logger.error(error);
    }
  }

  sendEvent(category, action, label, value = 0, nonInteraction = true) {
    try {
      const ga = window.ga || function() {};
      ga(
        `${this.options.prefix}.send`,
        "event",
        category,
        action,
        label,
        value,
        nonInteraction
      );
      this.logger.info(
        `Event ${JSON.stringify({
          category,
          action,
          label,
          value,
          nonInteraction
        })} sent`
      );
    } catch (error) {
      this.logger.error(error);
    }
  }

  setCustomProperty(type, index, value) {
    try {
      const ga = window.ga || function() {};
      ga(`${this.options.prefix}.set`, `${type.name}${index}`, value);
      this.logger.info(`Custom property ${type.name}${index} set to ${value}`);
    } catch (error) {
      this.logger.error(error);
    }
  }
}

export default GoogleAnalyticsFramework;

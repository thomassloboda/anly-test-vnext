import GoogleAnalyticsFramework from "./google-analytics-framework";
import CustomPropertyType from "./custom-property-type";

class Analytics {
  constructor(options) {
    if (options.framework === "google-analytics") {
      // Initialize Google Analytics library override
      this.framework = new GoogleAnalyticsFramework(options);
    }
  }
  init() {
    return new Promise((resolve, reject) => {
      // Initialize Google Analytics Framework
      this.framework
        .init()
        .then(resolve)
        .catch(reject);
    });
  }

  setPagename(name) {
    this.framework.setPagename(name);
  }

  sendPageview() {
    this.framework.sendPageview();
  }

  setCustomProperty(type, index, value) {
    this.framework.setCustomProperty(type, index, value);
  }

  register(events) {
    this.registerClickEvents(events);
    this.registerMouseoverEvents(events);
    this.registerConditionalEvents(events);
  }

  registerClickEvents(events) {
    events
      .filter(evt => evt.type === "click" && evt.context)
      .forEach(evt => {
        document
          .querySelector(`${evt.container} ${evt.element}`)
          .addEventListener("click", e => {
            this.framework.sendEvent(
              evt.category,
              evt.action,
              evt.label || evt.getLabel(),
              evt.value || evt.getValue()
            );
          });
      });
  }

  registerMouseoverEvents(events) {
    events
      .filter(evt => evt.type === "mouseover" && evt.context)
      .forEach(evt => {
        document
          .querySelector(`${evt.container} ${evt.element}`)
          .addEventListener("mouseover", e => {
            this.framework.sendEvent(
              evt.category,
              evt.action,
              evt.label || evt.getLabel(),
              evt.value || evt.getValue()
            );
          });
      });
  }

  registerConditionalEvents(events) {
    events
      .filter(evt => evt.type === "conditional")
      .forEach(evt => {
        if (evt.condition) {
          this.framework.sendEvent(
            evt.category,
            evt.action,
            evt.label || evt.getLabel(),
            evt.value || evt.getValue()
          );
        }
      });
  }
}

export default Analytics;

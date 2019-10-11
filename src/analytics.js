import GoogleAnalyticsFramework from "./google-analytics-framework";
import CustomPropertyType from "./custom-property-type";

class Analytics {
  init(options) {
    return new Promise((resolve, reject) => {
      // Initialize Google Analytics library override
      this.GAFramework = new GoogleAnalyticsFramework(options);

      // Initialize Google Analytics Framework
      this.GAFramework.init()
        .then(() => {
          this.GAFramework.setPagename("home");
          this.GAFramework.sendPageview();
          // Set some specific data like current environment
          this.GAFramework.setCustomProperty(
            CustomPropertyType.dimension,
            1,
            "prod"
          );
          resolve();
        })
        .catch(error => reject(error));
    });
  }

  register(events) {
    this.registerClickEvents(events);
    this.registerMouseoverEvents(events);
    this.registerConditionalEvents(events);
  }

  registerClickEvents(events) {
    events
      .filter(evt => evt.type === "click")
      .forEach(evt => {
        document
          .querySelector(`${evt.container} ${evt.element}`)
          .addEventListener("click", e => {
            this.GAFramework.sendEvent(
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
      .filter(evt => evt.type === "mouseover")
      .forEach(evt => {
        document
          .querySelector(`${evt.container} ${evt.element}`)
          .addEventListener("mouseover", e => {
            this.GAFramework.sendEvent(
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
          this.GAFramework.sendEvent(
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

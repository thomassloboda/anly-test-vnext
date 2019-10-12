# Analytics Framework vNext

> version 1.0.0

## Classes descriptions

### Entrypoint

_index.js_ is the entrypoint of the vNext Analytics Framework. It initialize the **Analytics** client library and register event to trigger.

### Analytics

_analytics.js_ is the **Analytics** client library. It instanciate an **AnalyticsFramework**, initialize it and is the interface between registered event and third party Analytics library implementation.

### AnalyticsFramework

_analytics-framework.js_ is an interface for every third party Analytics libraries.

### GoogleAnalyticsFramework

_google-analytics-framework.js_ is the implementation of the Google Analytics library which inherits **AnalyticsFramework**. It imports the client library, initialize it, create connection with the service and allow you to send data to Google Analytics.

### CustomIdentifier

_custom-identifier.js_ allow you to generate a random identifier base on the browser's UserAgent, the current TimeStamp and a randomString.

### CustomPropertyType

_custom-property-type.js_ contains definition for custom dimensions and metric to facilitate binding with Google Analytics data.

### Logger

_logger.js_ is an override of the basic browser's console adding date and time information and allowing you to scope your logs.

### LocalStorage

_local-storage.js_ is an override of the basic browser's localStorage which automatically check if the feature is available, scope your saved data and allow you to expose buisness methods.

## Basic usage

In the _index.js_ you can find a basic implementation.
To initialize the Framework you've to create an instance of **Analytics** passing it the options of the third party you want use.

```javascript
var analytics = Analytics({
  framework: "google-analytics",
  storagePrefix: "myAnalytics"
});
```

Once it's instanciated you've to initialize it. **init()** returns a Promise.

```javascript
analytics
  .init()
  .then(function() {
    // Analytics initialized
  })
  .catch(function(error) {
    // Something went wrong
  });
```

Final step is event registering calling **register()** method passing an Object's Array.

```javascript
analytics.register([]);
```

### Events you can register

#### Click event

```javascript
{
    type: "click",
    container: "myTriggeringElementContainer",
    element: "myTriggeringElement",
    category: "myEventCategory",
    action : "myEventAction",
    label : "myEventLabel", // If label is static
    getLabel: function() { // If label should be calculated
        return "myEventLabel";
    },
    value: "myEventValue", // If value is static
    getValue: function() { // If value should be calculated
        return "myEventValue"
    }
}
```

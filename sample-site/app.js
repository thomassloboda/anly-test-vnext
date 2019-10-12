let counter = -1;
const anly = new Analytics({
  framework: 'google-analytics', // Analytics third party to use
  accountID: "UA-149674147-1", // Google Analytics tracking code
  domain: window.location.hostname, // Current website domain
  cookieDomain: window.location.hostname, // Domain used for the Google Analytics Cookie
  prefix: "myBrand", // Prefix for Google Analytics
  storagePrefix: "brand.anly" // Profix for localStorage data
});
anly
  .init()
  .then(() =>
    anly.register([
      {
        type: "click", // Type of listener
        context: window.location.pathname === "/", // This is the scope
        container: "body", // The DOM container of the element to listen
        element: "#btn", // The DOM element to listen
        category: "Homepage-Button", // Event Category
        action: "Click", // Event Action
        // Event Label. Can be either fix or calculated
        getLabel: () => {
          return "You clicked this button";
        },
        // Event Value. Can be either fix or calculated
        getValue: () => {
          counter++;
          return counter;
        }
      },
      {
        type: "mouseover",
        context: window.location.pathname === "/",
        container: "body",
        element: "#over",
        category: "Homepage-Label",
        action: "Rollover",
        getLabel: () => {
          return "You passed your mouse on this label";
        },
        getValue: () => {
          counter++;
          return counter;
        }
      },
      {
        type: "conditional",
        getCondition: () => {
          if (
            window.location.pathname === "/" &&
            window.location.href.indexOf("redirected") > -1
          ) {
            return true;
          }
          return false;
        },
        category: "Homepage-Load",
        action: "Redirected",
        getLabel: () => {
          return "You're on an alternate homepage";
        },
        getValue: () => {
          counter++;
          return counter;
        }
      },
      {
        type: "ec_print",
        container: "",
        element: "",
        getProduct: () => {}
      }
    ])
  )
  .catch(console.error);

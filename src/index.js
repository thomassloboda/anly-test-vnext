import Analytics from "./analytics";

let counter = -1;
const anly = new Analytics();
anly
  .init({
    accountID: "UA-149674147-1", // Google Analytics tracking code
    domain: window.location.hostname, // Current website domain
    cookieDomain: window.location.hostname, // Domain used for the Google Analytics Cookie
    prefix: "myBrand", // Prefix for Google Analytics
    storagePrefix: "brand.anly" // Profix for localStorage data
  })
  .then(() =>
    anly.register([
      {
        context: window.location.pathname === "/", // This is the scope
        container: "body", // The DOM container of the element to listen
        element: "#btn", // The DOM element to listen
        type: "click", // Type of listener
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
        context: window.location.pathname === "/",
        container: "body",
        element: "#over",
        type: "mouseover",
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
        condition: window.location.href.indexOf("redirected") > -1,
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

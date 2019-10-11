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
        container: "body",
        element: "#btn",
        type: "click",
        category: "Homepage-Button",
        action: "Click",
        getLabel: () => {
          return "You clicked this button";
        },
        getValue: () => {
          counter++;
          return counter;
        }
      },
      {
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
      }
    ])
  )
  .catch(console.error);

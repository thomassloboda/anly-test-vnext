import InternalAnalytics from "./analytics";
import InternalCustomPropertyType from "./custom-property-type";

if (window) {
  window.Analytics = InternalAnalytics;
  window.CustomPropertyType = InternalCustomPropertyType;
}

export const Analytics = InternalAnalytics;
export const CustomPropertyType = InternalCustomPropertyType;

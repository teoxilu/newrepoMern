// src/analytics.js
import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-XXXXXXXXXX"); // Thay thế bằng mã theo dõi của bạn
};

export const logPageView = () => {
  ReactGA.send("pageview");
};

export const logEvent = (category = "", action = "", label = "") => {
  if (category && action) {
    ReactGA.event({
      category,
      action,
      label,
    });
  }
};

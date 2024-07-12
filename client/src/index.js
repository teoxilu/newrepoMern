import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {createStore} from "redux";
import { Provider } from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import rootReducer from "./reducers";
import 'antd/dist/antd.min.css';
import GlobalStyles from "~/components/GlobalStyles";
import './i18n'; // Import the i18n configuration

//store
const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  <GlobalStyles>
    <Provider store={store}>
        <App />
    </Provider>
  </GlobalStyles>,
  document.getElementById("root")
);

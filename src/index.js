import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { StateProvider } from "./components/utility/StateProvider";
import reducer, { initialState } from "./components/utility/reducer";
import { Provider } from "@lyket/react";
ReactDOM.render(
  <React.StrictMode>
    <Provider apiKey="pt_9952debc0139afff302a559804268d">
      <StateProvider initialState={initialState} reducer={reducer}>
        <App />
      </StateProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

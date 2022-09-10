import React from "react";
import ReactDOM from "react-dom";
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import rootReducer from './slices'
import HelloWorld from "./components/HelloWorld";

const store = configureStore({ reducer: rootReducer })

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <HelloWorld />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

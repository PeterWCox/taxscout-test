import React from "react";
import ReactDOM from "react-dom";
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import rootReducer from './slices'
import Container from "./components/Container";

const store = configureStore({ reducer: rootReducer })

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Container />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

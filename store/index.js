import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers } from "redux";

import createLang from "~/store/lang";

export function initializeStore(context, initialState) {
  const storeMap = {
    lang: createLang(context),
  };

  const reducers = {};
  const actions = {};
  for (const key in storeMap) {
    if (storeMap.hasOwnProperty(key)) {
      reducers[key] = storeMap[key].reducer;
      actions[key] = storeMap[key].actions;
    }
  }

  const currentStore = createStore(
    combineReducers(reducers),
    initialState,
    composeWithDevTools(applyMiddleware())
  );

  currentStore.actions = actions;

  return currentStore;
}

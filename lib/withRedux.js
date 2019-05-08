import React from "react"
import { initializeStore } from "../store"

const isServer = !process.browser;
const __NEXT_REDUX_STORE__ = "__NEXT_REDUX_STORE__"

function getOrCreateStore (context, initialState) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore(context, initialState)
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(context, initialState)
  }
  return window[__NEXT_REDUX_STORE__]
}

export default App => {
  return class AppWithRedux extends React.Component {
    static async getInitialProps (appContext) {
      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState
      const reduxStore = getOrCreateStore(appContext.ctx)

      // Provide the store to getInitialProps of pages
      appContext.ctx.$store = reduxStore;

      let appProps = {}
      if (typeof App.getInitialProps === "function") {
        appProps = await App.getInitialProps(appContext)
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState()
      }
    }

    constructor (props) {
      super(props)
      this.$store = getOrCreateStore(this, props.initialReduxState);

      // 添加store至全局
      React.Component.prototype.$store = this.$store;
    }

    render () {
      return <App {...this.props} store={this.$store} />
    }
  }
}

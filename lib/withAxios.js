import React from "react"
import yocAxios from "~/lib/yocAxios";

export default App => {
    return class AppWithAxios extends React.Component {
      static async getInitialProps (appContext) {

        let appProps = {}
        appContext.ctx.$axios = yocAxios(appContext.ctx).init(appContext.ctx.req);

        if (typeof App.getInitialProps === "function") {
          appProps = await App.getInitialProps(appContext);
        }

        return {
          ...appProps,
          $axios: appContext.ctx.$axios,
        }
      }

      constructor (props) {
        super(props)

        // 添加axios至全局
        React.Component.prototype.$axios = props.$axios || yocAxios();
      }

      render () {
        return <App {...this.props} />
      }
    }
  }
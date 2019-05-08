import App, { Container } from "next/app";
import React from "react";
import withAxios from "~/lib/withAxios";
import withReduxStore from "~/lib/withRedux";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "~/assets/css/common.less";
import {removeParamInLink} from "~/lib/utility.js";
import Cookie from "~/lib/cookie";
import HeadInfo from "~/components/headInfo";

class MyApp extends App {
  static async getInitialProps(appContext) {
    const { $store, req, query } = appContext.ctx;
    let appProps = {};

    let lang;
    if (query.lang) {
      lang = query.lang;
    } else if(req && req.cookies){
      lang = req.cookies.language;
    }

    if(lang) {
      await $store.actions.lang.setLang(lang);
    }

    if (typeof App.getInitialProps === "function") {
      appProps = await App.getInitialProps(appContext);
    }

    return {
      ...appProps,
    };
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let lang = this.props.router.query.lang;
    if(lang) {
      this.$store.actions.lang.setLang(lang);
      location.href = removeParamInLink("lang");
    } else {
      this.checkBroswer();
    }
  }

  checkBroswer() {
    const curLang = Cookie.get("language");
    if(curLang) {
      this.$store.actions.lang.setLang(curLang);
      return;
    }

    var language = (navigator.language || navigator.browserLanguage).toLowerCase() || "";
    if (language.indexOf("zh") >= 0) {
      if (language.indexOf("tw") >= 0 || language.indexOf("hk") >= 0) {
        if(this.props.$lang !== "zh_Hant_HK") {
          this.$store.actions.lang.setLang("zh_Hant_HK");
        }
      } else {
        if(this.props.$lang !== "zh_Hans_CN") {
          this.$store.actions.lang.setLang("zh_Hans_CN");
        }
      }
    } else {
      if(this.props.$lang !== "en_US") {
        this.$store.actions.lang.setLang("en_US");
      }
    }
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Provider store={store}>
        <Container>
          <HeadInfo/>
          <Component {...pageProps} />
        </Container>
      </Provider>
    );
  }
}

export default withAxios(withReduxStore(MyApp));

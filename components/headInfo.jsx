import React, { Component } from "react";
import "~/lib/extensions.js";
import {connect} from "react-redux";
import Head from "next/head";

@i18n("HeadInfo")
class HeadInfo extends Component {
    constructor(props){
        super(props);
    }

    render(){
      const title = "React+Nextjs+i18n 框架";
      const content = "React框架，React+less+i18n+redux+nextjs+express";

      return <Head>
        <title>{title}</title>
        <meta name="description" content={content}/>
        <meta name="og:title" property="og:title" content={title}/>
        <meta name="og:description" property="og:description" content={content}/>
        <meta name="og:description" property="og:image" content="/static/img/logo.png" />
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="format-detection" content="telephone=no"/>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8"/>
        <meta name="author" content="YLD(Winter)"/>
        <link rel="shortcut icon" href="/static/img/logo.png"/>
        <link rel="stylesheet" type="text/css" href="//at.alicdn.com/t/font_317044_3gjaktma3gs.css"/>
        <link data-n-head="true" data-hid="alternate-hreflang-en" rel="alternate" href="/?lang=en_US" hrefLang="en"/>
        <link data-n-head="true" data-hid="alternate-hreflang-zh-Hans" rel="alternate" href="/?lang=zh_Hans_CN" hrefLang="zh-Hans"/>
        <link data-n-head="true" data-hid="alternate-hreflang-zh-Hant" rel="alternate" href="/?lang=zh_Hant_HK" hrefLang="zh-Hant"/>
      </Head>
    }
}

const App = connect(state => {
    return {
        $lang: state.lang.lang
    };
}, () => { return {}; })(HeadInfo);

export default App;

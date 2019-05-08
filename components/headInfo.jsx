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
      const title = "在线API文档 - SamYoc";
      const content = "可视化在线API接口文档，高效的团队协作工具，文档轻松编辑与分享，数据云存储并提供权限管理，让前后端约定接口的工作变得十分简单。";
      const script = `
            var _hmt = _hmt || [];
            (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?6d645da3923b009afc97ec8ced21fdb0";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
            })();

            (function(){
            var src = (document.location.protocol == "http:") ? "http://js.passport.qihucdn.com/11.0.1.js?17ca5c69474621cd1529614da02668c6":"https://jspassport.ssl.qhimg.com/11.0.1.js?17ca5c69474621cd1529614da02668c6";
            document.write('<script src="' + src + '" id="sozz"><\\/script>');
            })();

            (function(){
                var bp = document.createElement('script');
                var curProtocol = window.location.protocol.split(':')[0];
                if (curProtocol === 'https') {
                    bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
                }
                else {
                    bp.src = 'http://push.zhanzhang.baidu.com/push.js';
                }
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(bp, s);
            })();
      `;
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
        <script type="text/javascript" dangerouslySetInnerHTML={{__html:script}}/>
      </Head>
    }
}

const App = connect(state => {
    return {
        $lang: state.lang.lang
    };
}, () => { return {}; })(HeadInfo);

export default App;

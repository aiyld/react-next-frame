import {
    updateState,
} from "~/lib/utility";
export const APP_LANG_LANG = "APP_LANG_LANG"; // 设置APP的语言
import Cookie from "~/lib/cookie";

export default (context) => {
  const defaultState = {
    locales: [
            { val: "zh_Hans_CN", text: "简体中文" },
            { val: "en_US", text: "English" },
            { val: "zh_Hant_HK", text: "繁体中文" },
    ], // available langages
    lang: "zh_Hans_CN",
  };

  const app = (state = defaultState, action) => {
    switch (action.type) {
      case APP_LANG_LANG:
        {
          let resultLang = action.lang;
          let find = false;
          for (let i = 0; i < state.locales.length; i++) {
            const element = state.locales[i];
            if(element.val === resultLang) {
              find = true;
              break;
            }
          }

          if(!find) {
            resultLang = "zh_Hans_CN";
          }

          state.lang = resultLang;
          if(process.browser) {
            Cookie.set("language", resultLang);
          }

          return updateState(state);
        }
      default:
        return state;
    }
  };

  const actions = {
    setLang(lang) {
      const {$store} = context;

      $store.dispatch({
        type: APP_LANG_LANG,
        lang: lang,
      });
    },
  };

  return {
    state: defaultState,
    reducer: app,
    actions,
  };
};

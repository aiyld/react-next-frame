const withLess = require("@zeit/next-less") //添加less模块
const withCSS = require("@zeit/next-css")
const path = require("path");

module.exports = withLess(withCSS({
    webpack(config) {
        // Further custom configuration here
        config.resolve.alias["~"] = path.resolve(__dirname);

        config.module.rules.push({
            // this loader will generate *.messages.json beside *.jsx files
            test: /(pages|components)(.+?)\.(js|jsx)$/,
            exclude: [
                /(node_modules)|(\.next)/,
                /(controls)/i,
            ],
            use: {
                loader: "react-i18loader",
                options: {
                    storePath: "locales",
                    languages: ["zh_Hans_CN", "zh_Hant_HK", "en_US"],
                }
            }
        });

        config.module.rules.push({
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            use: {
                loader: "url-loader",
                options: {
                    limit: 100000
                }
            }
        });

        return config;
    }
}));
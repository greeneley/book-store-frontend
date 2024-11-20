const tailwindcss = require("tailwindcss");
const postcssRemToPx = require("@thedutchcoder/postcss-rem-to-px");
module.exports = {
	plugins: ["postcss-preset-env", tailwindcss, postcssRemToPx]
};

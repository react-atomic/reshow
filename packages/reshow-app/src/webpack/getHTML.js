import HtmlWebpackPlugin from "html-webpack-plugin";

const getHTML = ({ indexTpl, indexHtml }) => {
  return new HtmlWebpackPlugin({
    minify: false,
    template: indexTpl,
    filename: indexHtml,
    scriptLoading: "defer",
  });
};

export default getHTML;

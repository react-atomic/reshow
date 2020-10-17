import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

const getBundleAnalyzerPlugin = ({ BUNDLE }) => {
  const options = {
    analyzerHost: "0.0.0.0",
    ...JSON.parse(BUNDLE),
  };
  const o = new BundleAnalyzerPlugin(options);
  return o;
};

export default getBundleAnalyzerPlugin;

import dedup from 'array.dedup';

const defaultVendor = ['react', 'react-dom', 'immutable'];

const getVendor = confs => {
  let vendor = defaultVendor.slice(0);
  if (confs.resetVendor) {
    vendor = confs.resetVendor;
  }
  if (confs.webpackVendor) {
    vendor = vendor.concat(confs.webpackVendor);
  }
  vendor = dedup(vendor);
  if (confs.disableVendor || !vendor || !vendor.length) {
    return null;
  } else {
    return vendor;
  }
};

const getVendorConfig = () => ({
  test: /node_modules/,
  chunks: 'initial',
  name: 'vendor',
  filename: '[name].bundle.js',
  priority: 10,
  enforce: true,
});

export default getVendor;
export {getVendorConfig};

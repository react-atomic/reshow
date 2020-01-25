import getVendor from './getVendor';

const getEntry = ({main, confs}) => {
  let entry;
  if (!main) {
    entry = {main: './build/src/client.js'};
  } else {
    entry = main;
  }
  const vendor = getVendor(confs);
  if (vendor) {
    entry.vendor = vendor;
  }
  return entry;
}

export default getEntry;

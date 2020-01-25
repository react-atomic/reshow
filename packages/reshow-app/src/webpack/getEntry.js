import getVendor from './getVendor';

const getEntry = ({main, confs, server}) => {
  let entry;
  if (!main) {
    if (server) {
      entry = {main: './build/src/server.js'};
    } else {
      entry = {main: './build/src/client.js'};
    }
  } else {
    entry = main;
  }
  if (!server) { 
    const vendor = getVendor(confs);
    if (vendor) {
      entry.vendor = vendor;
    }
  }
  return entry;
}

export default getEntry;

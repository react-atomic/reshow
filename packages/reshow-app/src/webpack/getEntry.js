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
  return entry;
}

export default getEntry;

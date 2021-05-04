const getEntry = ({ main, confs, server }) => {
  let entry;
  if (!main) {
    if (server) {
      entry = { node: "./build/es/src/server.js" };
    } else {
      entry = { main: "./build/es/src/client.js" };
    }
  } else {
    entry = main;
  }
  return entry;
};

export default getEntry;

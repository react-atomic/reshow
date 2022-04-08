import ReactServer from "react-dom/server";
import build from "reshow-build";

const renderToString = (result, { process }) => {
  const len = result.length;
  let last = 0;
  while (last < len) {
    process.stdout.write(result.substr(last, 1000));
    last += 1000;
  }
};

const readStream = async (stream, { Buffer }) => {
  const reader = stream.getReader();
  const arr = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      return Buffer.concat(arr).toString("utf-8");
    }
    arr.push(Buffer.from(value));
  }
};

const renderToStream = (oPromise, { process, Buffer }) => {
  oPromise.then(async (stream) => {
    const result = await readStream(stream, { Buffer });
    renderToString(result, { process });
  });
};

const server = (app) => {
  return ({ process, fs, JSON, Buffer }) => {
    process.env.node_env = "production";
    const fd = process.stdin.fd;
    const bSize = 4096;
    const buffer = Buffer.alloc(bSize);
    let temp = fs.readSync(fd, buffer, 0, bSize);
    let context = "";
    while (temp) {
      context += buffer.toString("utf-8", 0, temp);
      temp = fs.readSync(fd, buffer, 0, bSize);
    }
    const myJson = JSON.parse(context);
    const result = ReactServer.renderToReadableStream(build(app)(myJson));
    process.stdout.write("<!--start-->");
    renderToStream(result, { process, Buffer });
  };
};

export default server;

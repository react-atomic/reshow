import ReactServerBrowser from "react-dom/server.browser";
import ReactServerNode from "react-dom/server.node";
import build from "reshow-build";
import Stream from "readable-stream";

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

const getPipeWritable = ({ process }) => {
  const writable = new Stream.PassThrough();
  writable.setEncoding("utf8");
  const output = { result: "", error: undefined };
  let init = false;
  writable.on("data", (chunk) => {
    if (!init) {
      init = true;
      process.stdout.write("<!--start-->");
    }
    process.stdout.write(chunk);
  });
  writable.on("error", (error) => {
    output.error = error;
  });
  const completed = new Promise((resolve) => {
    writable.on("finish", () => {
      resolve();
    });
    writable.on("error", () => {
      resolve();
    });
  });
  return { writable, completed, output };
};

const render = {
  renderToString: (result, { process }) => {
    const len = result.length;
    let last = 0;
    while (last < len) {
      process.stdout.write(result.substr(last, 1000));
      last += 1000;
    }
  },
  renderToPipeableStream: (result, { process }) => {
    const { writable, output } = getPipeWritable({ process });
    result.pipe(writable);
  },
  renderToReadableStream: (oPromise, { process, Buffer }) => {
    oPromise.then(async (stream) => {
      const result = await readStream(stream, { Buffer });
      render.renderToString(result, { process });
    });
  },
};

const ReactServer = {
  renderToString: ReactServerNode.renderToString,
  renderToPipeableStream: ReactServerNode.renderToPipeableStream,
  renderToReadableStream: ReactServerBrowser.renderToReadableStream,
};

const server = (app, renderTo = "renderToReadableStream") => {
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
    const result = ReactServer[renderTo](build(app)(myJson));
    if ("renderToPipeableStream" !== renderTo) {
      process.stdout.write("<!--start-->");
    }
    render[renderTo](result, { process, Buffer });
  };
};

export default server;

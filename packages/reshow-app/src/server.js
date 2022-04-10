import ReactServerBrowser from "react-dom/server.browser";
import ReactServerNode from "react-dom/server.node";
import build from "reshow-build";
import Stream from "readable-stream";

const SEPARATOR = "\r\n\r\n";

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
      process.stdout.write(SEPARATOR);
    }
    process.stdout.write(chunk);
  });
  writable.on("error", (error) => {
    output.error = error;
  });
  const completed = new Promise((resolve) => {
    writable.on("finish", () => {
      resolve();
      process.exit();
    });
    writable.on("error", () => {
      resolve();
      process.exit();
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
    process.exit();
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

const server =
  (app, renderTo = "renderToReadableStream") =>
  ({ process, fs, JSON, Buffer }) => {
    const inputData = Buffer.from(fs.readFileSync(process.stdin.fd)).toString(
      "utf-8"
    );
    const result = ReactServer[renderTo](build(app)(JSON.parse(inputData)));
    if ("renderToPipeableStream" !== renderTo) {
      process.stdout.write(SEPARATOR);
    }
    render[renderTo](result, { process, Buffer });
  };

export default server;

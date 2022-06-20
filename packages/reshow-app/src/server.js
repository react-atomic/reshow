import ReactServerBrowser from "react-dom/server.browser";
import ReactServerNode from "react-dom/server.node";
import build from "reshow-build";
import Stream from "readable-stream";

const SEPARATOR = "\r\n\r\n";
let init = false;

const readStream = async (stream, { process, Buffer }) => {
  const reader = stream.getReader();
  const arr = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      return Buffer.concat(arr).toString("utf-8");
    }
    if (!init) {
      init = true;
      process.stdout.write(SEPARATOR);
    }
    arr.push(Buffer.from(value));
  }
};

const processExit = (process) => {
  process.stdout.write(SEPARATOR);
  process.exit(0);
};

const getPipeWritable = ({ process }) => {
  const writable = new Stream.PassThrough();
  writable.setEncoding("utf8");
  const output = { result: "", error: undefined };
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
    const handleResolve = () => {
      resolve();
      processExit(process);
    };
    writable.on("finish", handleResolve);
    writable.on("error", handleResolve);
  });
  return { writable, completed, output };
};

const render = {
  renderToString: (result, { process }) => {
    const len = result.length;
    const buf = 1024;
    let last = 0;
    while (last < len) {
      process.stdout.write(result.substr(last, buf));
      last += buf;
    }
    processExit(process);
  },
  renderToPipeableStream: (result, { process }) => {
    const { writable, output } = getPipeWritable({ process });
    result.pipe(writable);
  },
  renderToReadableStream: (oPromise, { process, Buffer }) => {
    oPromise.then(async (stream) => {
      const result = await readStream(stream, { process, Buffer });
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
    /**
     * why use /dev/stdin?
     * https://github.com/react-atomic/reshow/issues/119
     */
    const inputData = fs.readFileSync("/dev/stdin", {
      encoding: "utf8",
      flag: "r",
    });
    const result = ReactServer[renderTo](build(app)(JSON.parse(inputData)));
    if ("renderToString" === renderTo) {
      process.stdout.write(SEPARATOR);
    }
    render[renderTo](result, { process, Buffer });
  };

export default server;

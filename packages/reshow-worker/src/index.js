import { initAjaxWorkerEvent } from "organism-react-ajax";
import { getDefault } from "get-object-value";
import { win as getWin } from "win-doc";
import windowOnLoad from "window-onload";

const importWorker = (win, serviceWorkerURL) => {
  import("worker-loader!organism-react-ajax/build/es/src/worker").then(
    (workerObject) => {
      workerObject = getDefault(workerObject);
      if (workerObject) {
        const objWorker = new workerObject();
        initAjaxWorkerEvent(objWorker);
      }
    }
  );
  if ("serviceWorker" in win.navigator) {
    const [load] = windowOnLoad({ domReady: true, domReadyDelay: 0 });
    load(() => {
      win.navigator.serviceWorker
        .register(serviceWorkerURL)
        .then((registration) => {})
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError);
        });
    });
  }
};

const initWorker = ({
  win = getWin(),
  cb = importWorker,
  serviceWorkerURL = "/service-worker.js",
}) => {
  if (win.Worker) {
    cb(win, serviceWorkerURL);
  }
};

export default initWorker;

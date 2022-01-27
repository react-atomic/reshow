import { initAjaxWorkerEvent } from "organism-react-ajax";
import { getDefault } from "get-object-value";
import { win } from "win-doc";
import windowOnLoad from "window-onload";

const importWorker = (oWin) => {
  import("worker-loader!organism-react-ajax/build/es/src/worker").then(
    (workerObject) => {
      workerObject = getDefault(workerObject);
      if (workerObject) {
        const objWorker = new workerObject();
        initAjaxWorkerEvent(objWorker);
      }
    }
  );
  if ("serviceWorker" in oWin.navigator) {
    const [load] = windowOnLoad();
    load(() => {
      oWin.navigator.serviceWorker
        .register(`${__webpack_public_path__}service-worker.js`)
        .then((registration) => {})
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError);
        });
    });
  }
};

const initWorker = (oWin = win(), cb = importWorker) => {
  if (oWin.Worker) {
    cb(oWin);
  }
};

export default initWorker;

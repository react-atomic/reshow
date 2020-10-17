import { initAjaxWorkerEvent } from "organism-react-ajax";
import { getDefault } from "get-object-value";
import { win } from "win-doc";

const importWorker = () => {
  import("worker-loader!organism-react-ajax/build/es/src/worker").then(
    (workerObject) => {
      workerObject = getDefault(workerObject);
      if (workerObject) {
        const objWorker = new workerObject();
        initAjaxWorkerEvent(objWorker);
      }
    }
  );
};

const initWorker = (oWin, cb) => {
  oWin = oWin || win();
  cb = cb || importWorker;
  if (oWin.Worker) {
    cb();
  }
};

export default initWorker;

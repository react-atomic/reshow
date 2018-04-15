import {initAjaxWorkerEvent} from 'organism-react-ajax';
import {getDefault} from 'get-object-value';

const initWorker = () =>
{
    if ('undefined' !== typeof window) {
        if (window.Worker) {
            import('worker-loader!organism-react-ajax/build/es/src/worker').
                then( workerObject => {
                    workerObject = getDefault(workerObject);
                    if (workerObject) {
                        const objWorker = new workerObject();
                        initAjaxWorkerEvent(objWorker);
                    }
            });
        }
    }
};

export default initWorker;

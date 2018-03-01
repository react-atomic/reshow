import {initAjaxWorkerEvent} from 'organism-react-ajax';

const initWorker = () =>
{
    if ('undefined' !== typeof window) {
        if (window.Worker) {
            import('worker-loader!organism-react-ajax/build/es/src/worker').
                then( ({default: workerObject}) => {
                    if (workerObject) {
                        const objWorker = new workerObject();
                        initAjaxWorkerEvent(objWorker);
                    }
            });
        }
    }
};

export default initWorker;

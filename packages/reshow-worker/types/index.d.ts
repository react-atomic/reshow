export default initWorker;
declare function initWorker({ win, cb, serviceWorkerURL, }: {
    win?: Window & typeof globalThis;
    cb?: (win: any, serviceWorkerURL: any) => void;
    serviceWorkerURL?: string;
}): void;

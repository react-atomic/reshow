export default getCache;
declare function getCache({ mode }: {
    mode: any;
}): {
    cache: {
        type: string;
        allowCollectingMemory: boolean;
    };
} | {
    cache?: undefined;
};

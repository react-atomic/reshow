export default getModule;
declare function getModule(): {
    rules: {
        oneOf: ({
            resourceQuery: RegExp;
            type: string;
            test?: undefined;
            exclude?: undefined;
            use?: undefined;
        } | {
            test: RegExp;
            exclude: RegExp[];
            use: {
                loader: string;
            };
            resourceQuery?: undefined;
            type?: undefined;
        })[];
    }[];
};

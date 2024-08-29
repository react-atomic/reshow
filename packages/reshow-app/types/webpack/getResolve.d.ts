export default getResolve;
declare function getResolve({ confs, root }: {
    confs: any;
    root: any;
}): {
    symlinks: boolean;
    extensions: string[];
    fallback: any;
    alias: any;
};
export function getResolveLoader({ root }: {
    root: any;
}): {
    modules: string[];
};

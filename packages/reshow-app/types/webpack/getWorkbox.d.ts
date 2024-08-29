export default getWorkbox;
/**
 * https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-webpack-plugin.GenerateSW
 *
 * swDest need same folder with location / (Root)
 *
 */
declare function getWorkbox({ swDest, swDebug, additionalManifestEntries }: {
    swDest: any;
    swDebug: any;
    additionalManifestEntries: any;
}): any;

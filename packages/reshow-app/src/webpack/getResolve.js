import reshowRuntimeAlias from './reshowRuntimeAlias';

const getResolve = ({confs, root}) => {
  const alias = {
    react: root + '/node_modules/react',
    'react-dom': root + '/node_modules/react-dom',
    reshow: root + '/node_modules/reshow',
    'organism-react-ajax': root + '/node_modules/organism-react-ajax',
    ...reshowRuntimeAlias(root),
    ...confs.alias,
  };
  return {
    extensions: ['.mjs', '.js', '.jsx'],
    alias,
  };
};

const getResolveLoader = ({root}) => ({
  modules: [root + '/node_modules'],
});

const getNode = () => ({
  fs: 'empty',
  net: 'empty',
  tls: 'empty',
})

export default getResolve;
export {getResolveLoader, getNode};

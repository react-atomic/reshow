import getStatsJson from './getStatsJson';
import FinishPlugin from './FinishPlugin';

const getPlugins = ({path, stop}) => {
  const plugins = [
    getStatsJson(),
  ];
  if (stop) {
    plugins.push(new FinishPlugin({stop}));
  }
  return plugins;
};

export default getPlugins;

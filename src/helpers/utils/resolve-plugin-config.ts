import semanticRelease from 'semantic-release';

export function resolvePluginConfig(
  plugins: semanticRelease.PluginSpec[],
  pluginName: string,
): semanticRelease.PluginSpec {
  const foundConfig = plugins.find((plugin) => (
    Array.isArray(plugin)
      ? plugin[0] === pluginName
      : plugin === pluginName
  ));

  return foundConfig ?? pluginName;
}

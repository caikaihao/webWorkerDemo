module.exports = function override(config, env) {
  config.module.rules.push({
      test: /\.worker\.js$/,
      use: { loader: 'worker-loader' ,
        options: { inline: true }
      }
    })
    config.output.globalObject = 'this'
  return config;
}
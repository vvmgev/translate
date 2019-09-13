module.exports = (api) => {
  api.cache(true);

  const presets = [
    [
      "@babel/typescript",
      {},
      '@babel/preset-env',

    ],
  ];

  return { presets };
};

// next.config.js
var nextConfig = {
  // output: 'export',
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = { fs: false };
    }
    config.module.rules.push({
      test: /\.(ttf|woff|woff2|eot|svg)$/,
      use: {
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "static/fonts/",
          // Change the output path as needed
          publicPath: "/_next/static/fonts/"
          // Adjust the public path to match the output path
        }
      }
    });
    return config;
  }
};
module.exports = nextConfig;

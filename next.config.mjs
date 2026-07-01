const nextConfig = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    if (isServer) {
      config.output.chunkFilename = "[name].js";
    }
    return config;
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        // Camera and location are used by this app; everything else stays off.
        source: '/(.*)',
        headers: [{ key: 'Permissions-Policy', value: 'camera=(self), geolocation=(self), microphone=()' }],
      },
    ];
  },
};
export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
            protocol: 'https',
            hostname: "res.cloudinary.com",
            port: '',
            pathname: '/dtb01les5/**'
        },
      ],
    },
  };
  
  export default nextConfig;
  
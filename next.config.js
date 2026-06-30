/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  serverExternalPackages: ["nodemailer"],
};

module.exports = nextConfig;

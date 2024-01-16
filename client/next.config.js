/** @type {import('next').NextConfig} */

const customRoute =  process.env.environment === "development"? "http://localhost:7156" : "http://server:80";

const nextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/api/user/sign_in",
        destination: `${customRoute}/api/User/Login`,
      },
      {
        source: "/api/user/sign_up",
        destination: `${customRoute}/api/User/Register`,
      },
      {
        source: "/api/user/verify",
        destination: `${customRoute}/api/User/VerifyToken`,
      },
      {
        source: "/api/user/forget_password",
        destination: `${customRoute}/api/User/ForgetPassword`,
      },
      {
        source: "/api/user/reset_password",
        destination: `${customRoute}/api/User/ResetPassword`,
      },
      {
        source: "/api/appointment/:path*",
        destination: `${customRoute}/api/Appointment/:path*`,
      },
      {
        source: "/api/odontologist/:path*",
        destination: `${customRoute}/api/Odontologist/:path*`,
      },
      {
        source: "/api/schedule/:path*",
        destination: `${customRoute}/api/Schedule/:path*`,
      },
      {
        source: "/api/break_time/:path*",
        destination: `${customRoute}/api/BreakTime/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;

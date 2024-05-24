const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const NEXTJS_SERVER = "http://localhost:3000";

const proxy = createProxyMiddleware({
  target: NEXTJS_SERVER,
  changeOrigin: true,
  on: {
    proxyReq: (proxyReq, req, res) => {
      proxyReq.setHeader("x-forwarded-host", req.headers.host);
    },
  },
});

const cache = {};

express()
  .use(express.json())
  .use("/", async (req, res, next) => {
    return proxy(req, res, next);
  })
  .listen(4000);

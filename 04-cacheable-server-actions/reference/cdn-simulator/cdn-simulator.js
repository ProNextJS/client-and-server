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
    if (req.query.hash) {
      req.rawBody = "";
      req.setEncoding("utf8");

      req.on("data", function (chunk) {
        req.rawBody += chunk;
      });

      req.on("end", async function () {
        if (!cache[req.query.hash]) {
          const saResp = await fetch(`${NEXTJS_SERVER}${req.url}`, {
            method: "POST",
            body: req.rawBody,
            headers: {
              ...req.headers,
              "x-forwarded-host": req.headers.host,
            },
          });
          cache[req.query.hash] = await saResp.text();
        } else {
          console.log(`Cache HIT: ${req.query.hash}`);
          console.log(cache[req.query.hash]);
        }
        res.setHeader("content-type", "text/x-component");
        res.write(cache[req.query.hash]);
        res.end();
      });
    } else {
      return proxy(req, res, next);
    }
  })
  .listen(4000);

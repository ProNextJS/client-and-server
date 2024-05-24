import express from "express";
import cors from "cors";

const port = process.env.PORT || 8080;
const app = express();

app
  .disable("x-powered-by")
  .use(cors())
  .get("/time", (_, res) => {
    return res.json({ time: new Date().toLocaleTimeString() });
  })
  .listen(port, () => {
    console.log(`REST api running on ${port}`);
  });

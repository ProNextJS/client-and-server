import { createServer } from "./server";

const port = process.env.PORT || 5002;
const server = createServer();

server.listen(port, () => {
  console.log(`REST api running on ${port}`);
});

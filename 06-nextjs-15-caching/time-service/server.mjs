import Fastify from "fastify";
const fastify = Fastify({
  logger: true,
});

fastify.get("/", async function handler() {
  return { date: new Date().toLocaleString() };
});

try {
  await fastify.listen({ port: 8080 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}

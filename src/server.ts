import fastify from "fastify";
import { getPokemons, getPokemonById } from "./controllers/pokemonController";
import cors from "@fastify/cors";
import { metrics } from "./metrics/metrics";

const port = parseInt(process.env.SERVER_PORT || "3000", 10);
const app = fastify({ logger: true });

app.register(cors);

app.addHook("onRequest", (req, res, done) => {
  metrics.http_requests_total.inc();
  done();
});

// Expose the /metrics endpoint for Prometheus to scrape
app.get("/metrics", async (req, res) => {
  res.header("Content-Type", metrics.register.contentType);
  res.send(await metrics.register.metrics());
});

app.get("/pokemons", async (req, res) => {
  await getPokemons(req, res);
});

app.get("/pokemon/:id", async (req, res) => {
  await getPokemonById(req, res);
});

app.listen({ port }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`
🚀 Server ready at: http://localhost:3000`);
});

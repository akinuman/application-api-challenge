import { collectDefaultMetrics, Counter, register } from "prom-client";

// Collect default metrics
collectDefaultMetrics();

const http_requests_total = new Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
});

export const metrics = {
  http_requests_total,
  register,
};

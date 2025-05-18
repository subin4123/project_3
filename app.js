console.log("RUNNING app.js VERSION WITH /metrics ROUTE");

const express = require('express');
const promClient = require('prom-client');

const app = express();
const port = 3002;

// Collect default metrics
const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics();

// Root endpoint
app.get('/', (req, res) => {
  res.send('New version deployed');
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', promClient.register.contentType);
    const metrics = await promClient.register.metrics();
    res.end(metrics);
  } catch (ex) {
    res.status(500).end(ex);
  }
});

// Start server and list registered routes
app.listen(port, '0.0.0.0', () => {
  console.log(`App listening on http://0.0.0.0:${port}`);
  const routes = app._router?.stack
    ?.filter(r => r.route)
    ?.map(r => r.route.path);

  if (routes && routes.length > 0) {
    console.log("Registered routes:", routes);
  } else {
    console.log("No routes found on app._router.");
  }
});


// otel-instrumentation.js
// OpenTelemetry setup for BeatHub backend

const { NodeSDK } = require("@opentelemetry/sdk-node");
const {
  getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");
const { ConsoleSpanExporter } = require("@opentelemetry/sdk-trace-base");
const { SimpleSpanProcessor } = require("@opentelemetry/sdk-trace-base");
const { resourceFromAttributes } = require("@opentelemetry/resources");
const {
  SemanticResourceAttributes,
} = require("@opentelemetry/semantic-conventions");

const sdk = new NodeSDK({
  resource: resourceFromAttributes({
    [SemanticResourceAttributes.SERVICE_NAME]: "beathub-backend",
  }),
  instrumentations: [getNodeAutoInstrumentations()],
  spanProcessor: new SimpleSpanProcessor(new ConsoleSpanExporter()),
});

sdk.start();

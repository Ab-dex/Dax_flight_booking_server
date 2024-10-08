"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenTelemetryTracer = exports.OpenTelemetryOptions = void 0;
const common_1 = require("@nestjs/common");
const sdk_trace_node_1 = require("@opentelemetry/sdk-trace-node");
const exporter_zipkin_1 = require("@opentelemetry/exporter-zipkin");
const instrumentation_amqplib_1 = require("@opentelemetry/instrumentation-amqplib");
const sdk_trace_base_1 = require("@opentelemetry/sdk-trace-base");
const instrumentation_http_1 = require("@opentelemetry/instrumentation-http");
const instrumentation_express_1 = require("@opentelemetry/instrumentation-express");
const instrumentation_nestjs_core_1 = require("@opentelemetry/instrumentation-nestjs-core");
const resources_1 = require("@opentelemetry/resources");
const semantic_conventions_1 = require("@opentelemetry/semantic-conventions");
const exporter_jaeger_1 = require("@opentelemetry/exporter-jaeger");
const api_1 = require("@opentelemetry/api");
const config_1 = __importDefault(require("../configs/config"));
const sdk_node_1 = require("@opentelemetry/sdk-node");
class OpenTelemetryOptions {
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.OpenTelemetryOptions = OpenTelemetryOptions;
let openTelemetryOptions = new OpenTelemetryOptions();
const otelSDK = initSdk();
async function initSdk() {
    var _a, _b, _c, _d;
    const provider = new sdk_trace_node_1.NodeTracerProvider({
        resource: new resources_1.Resource({
            [semantic_conventions_1.SemanticResourceAttributes.SERVICE_NAME]: (_a = openTelemetryOptions === null || openTelemetryOptions === void 0 ? void 0 : openTelemetryOptions.serviceName) !== null && _a !== void 0 ? _a : config_1.default.serviceName
        })
    });
    const jaegerExporter = new exporter_jaeger_1.JaegerExporter({
        endpoint: (_b = openTelemetryOptions === null || openTelemetryOptions === void 0 ? void 0 : openTelemetryOptions.jaegerEndpoint) !== null && _b !== void 0 ? _b : config_1.default.monitoring.jaegerEndpoint
    });
    const zipkinExporter = new exporter_zipkin_1.ZipkinExporter({
        url: (_c = openTelemetryOptions === null || openTelemetryOptions === void 0 ? void 0 : openTelemetryOptions.zipkinEndpoint) !== null && _c !== void 0 ? _c : config_1.default.monitoring.zipkinEndpoint,
        serviceName: (_d = openTelemetryOptions === null || openTelemetryOptions === void 0 ? void 0 : openTelemetryOptions.serviceName) !== null && _d !== void 0 ? _d : config_1.default.serviceName
    });
    provider.addSpanProcessor(new sdk_trace_base_1.SimpleSpanProcessor(jaegerExporter));
    provider.addSpanProcessor(new sdk_trace_node_1.BatchSpanProcessor(zipkinExporter));
    provider.register();
    return new sdk_node_1.NodeSDK({
        resource: provider.resource,
        instrumentations: [
            new instrumentation_http_1.HttpInstrumentation(),
            new instrumentation_express_1.ExpressInstrumentation(),
            new instrumentation_nestjs_core_1.NestInstrumentation(),
            new instrumentation_amqplib_1.AmqplibInstrumentation()
        ]
    });
}
let OpenTelemetryTracer = class OpenTelemetryTracer {
    constructor(options) {
        this.options = options;
        openTelemetryOptions = this.options;
    }
    async onModuleInit() {
        (await otelSDK).start();
    }
    async createTracer(options) {
        var _a;
        const tracer = api_1.trace.getTracer((_a = options === null || options === void 0 ? void 0 : options.serviceName) !== null && _a !== void 0 ? _a : config_1.default.serviceName);
        return tracer;
    }
};
exports.OpenTelemetryTracer = OpenTelemetryTracer;
exports.OpenTelemetryTracer = OpenTelemetryTracer = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(OpenTelemetryOptions)),
    __metadata("design:paramtypes", [OpenTelemetryOptions])
], OpenTelemetryTracer);
//# sourceMappingURL=open-telemetry-tracer.js.map
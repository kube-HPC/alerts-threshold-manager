const packageJson = require(process.cwd() + '/package.json');
const config = {};

config.serviceName = packageJson.name;
const useSentinel = !!process.env.REDIS_SENTINEL_SERVICE_HOST;
config.defaultStorage = process.env.DEFAULT_STORAGE || 's3';

config.apiServer = {
    protocol: 'http',
    host: process.env.API_SERVER_SERVICE_HOST || 'localhost',
    port: process.env.API_SERVER_SERVICE_PORT || 3000,
    basePath: 'internal/v1/exec/'
};

config.timeouts = {
    stop: 10000 // timeout to stop the algorithm in ms
};

config.metrics = {
    prefix: 'hkube_',
    collectDefault: true,
    server: {
        port: process.env.METRICS_PORT || 3001
    },
    thresholds: {
        GENERAL_RATE_GROW: process.env.GENERAL_RATE_GROW_WARN_THRES,
        PIPE_FAIL_RATE_FRACTION: process.env.PIPE_FAIL_RATE_FRACTION_WARN_THRES,
        ALG_FAIL_RATE_FRACTION: process.env.ALG_FAIL_RATE_FRACTION_WARN_THRES,
        MIN_PIPE_TIME_IN_QUEUE_WARN: process.env.MIN_PIPE_TIME_IN_QUEUE_WARN_THRES,
        MIN_ALG_TIME_IN_QUEUE_WARN: process.env.MIN_ALG_TIME_IN_QUEUE_WARN_THRES,
        CPU_USAGE_GROW: process.env.CPU_USAGE_GROW_WARN_THRES,
        MIN_CPU_USAGE_WARN: process.env.MIN_CPU_USAGE_WARN_THRES,
        ALG_MEM_MB_WARN: process.env.ALG_MEM_MB_WARN_THRES,
    }
};

config.rest = {
    port: process.env.REST_PORT || 8081
};

config.tracer = {
    tracerConfig: {
        serviceName: config.serviceName,
        reporter: {
            agentHost: process.env.JAEGER_AGENT_SERVICE_HOST || 'localhost',
            agentPort: process.env.JAEGER_AGENT_SERVICE_PORT_AGENT_BINARY || 6832
        }
    }
};


config.kubernetes = {
    isLocal: !!process.env.KUBERNETES_SERVICE_HOST,
    namespace: process.env.NAMESPACE || 'default',
    pod_name: process.env.POD_NAME
};

module.exports = config;

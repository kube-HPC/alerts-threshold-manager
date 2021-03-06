const config = {};
config.transport = {
    console: false,
    fluentd: false,
    logstash: false,
    file: false
};
config.verbosityLevel = process.env.HKUBE_LOG_LEVEL || 2;

module.exports = config;

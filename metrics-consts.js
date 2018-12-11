const configIt = require('@hkube/config');
const { main } = configIt.load();
const default_thresholds = main.metrics.thresholds

const general = {
    THRES_MGR_PREFIX: 'thres_mgr_'
};

const metricsDescr = [
    {
        name: 'test',
        description: 'for testing use',
        default: 2
    },
    {
        name: 'general_warn_rate_grow',
        description: 'general rate grow warning threshold, e.g. 0.2 means rate grows by 20%',
        default: Number(default_thresholds.GENERAL_RATE_GROW) || 0.2
    },
    {
        name: 'warn_pipeline_failure_rate_fraction',
        description: 'pipeline_failure_rate/pipeline_rate warning level threshold [0-1]',
        default: Number(default_thresholds.PIPE_FAIL_RATE_FRACTION) || 0.3
    },
    {
        name: 'warn_alg_failure_rate_fraction',
        description: 'algorithm_failure_rate/alg_rate high alarm threshold [0-1]',
        default: Number(default_thresholds.ALG_FAIL_RATE_FRACTION) || 0.3
    },
    {
        name: 'min_warn_alg_time_in_queue',
        description: 'min algorithm time_in_queue for alarms (more conditions are used) [ms]',
        default: Number(default_thresholds.MIN_ALG_TIME_IN_QUEUE_WARN) || 1000
    },
    {
        name: 'min_warn_pipeline_time_in_queue',
        description: 'min pipeline time_in_queue for alarms (more conditions are used) [ms]',
        default: Number(default_thresholds.MIN_PIPE_TIME_IN_QUEUE_WARN) || 1000
    },
    {
        name: 'warn_alg_memory_usage',
        description: 'algorithm_memory_usage warning alarm threshold [MB]',
        default: Number(default_thresholds.ALG_MEM_MB_WARN) || 10000
    },
    {
        name: 'warn_alg_cpu_usage_grow',
        description: 'CPU usage rate warning grow threshold [0-1]',
        default: Number(default_thresholds.CPU_USAGE_GROW_THRES) || 0.4
    },
    {
        name: 'warn_alg_cpu_usage',
        description: 'min algorithms CPU usage for CPU usage alert [cores]',
        default: Number(default_thresholds.MIN_CPU_USAGE_WARN) || 10
    },
]

module.exports = {general, metricsDescr};
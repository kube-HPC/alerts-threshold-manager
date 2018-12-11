
const { metrics } = require('@hkube/metrics');
const { general } = require('./metrics-consts.js');
const Logger = require('@hkube/logger');


const GAUGE_POSTFIX = '_gauge';

class ThresholdGauge {
    constructor(gaugeConfig) {
        this._log = Logger.GetLogFromContainer();
        const name = general.THRES_MGR_PREFIX + gaugeConfig.name;
        this._gauge = metrics.addGaugeMeasure({
            name,
            description: gaugeConfig.description,
        });
        this._config = gaugeConfig;
        this.set(this._config.default);
    }

    getFullName() {
        return this._gauge._name + GAUGE_POSTFIX;
    }

    get() {
        return this._value;
    }

    set(value) {
        this._gauge.set({value});
        this._value = value;
        const text = 'set ' + this.getFullName() + ': ' + value;
        console.log(text);
        this._log.info(text);
    }

    getDescr() {
        return this._config.description;
    }

    reset() {
        this.set(this._config.default);
    }
};

module.exports = ThresholdGauge;
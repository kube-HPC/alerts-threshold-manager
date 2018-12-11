
const configIt = require('@hkube/config');
const Logger = require('@hkube/logger');
const { metrics } = require('@hkube/metrics');
const express = require('express');
const {general, metricsDescr} = require('./metrics-consts.js');
const restServer = require('./rest-server');
const ThresholdGauge = require('./threshold-gauge');

const app = express();
let log;
let component;

class Bootstrap {
    async init() {
        try {
            const { main, logger } = configIt.load();
            this._handleErrors();

            log = new Logger(main.serviceName, logger);
            component = main.serviceName;
            log.info('running application in ' + configIt.env() + ' environment', { component });

            // init matrics package
            await metrics.init(main.metrics);
            // init matrics 
            console.log('setting metrics default values...')
            const metricsArr = [];
            for (var i in metricsDescr) {
                // create ThresholdGauge instance and save it in array
                let threshold = new ThresholdGauge(metricsDescr[i]);
                const fullName = threshold.getFullName();
                metricsArr[fullName] = threshold;
            };
        
            // init and run rest server
            restServer.init(main.rest, metricsArr);

            return main;
        }
        catch (error) {
            this._onInitFailed(error);
        }
    }

    _onInitFailed(error) {
        if (log) {
            log.error(error.message, { component }, error);
            log.error(error);
        }
        else {
            console.error(error.message);
            console.error(error);
        }
        process.exit(1);
    }

    _handleErrors() {
        process.on('exit', (code) => {
            log.info(`exit code ${code}`, { component });
        });
        process.on('SIGINT', () => {
            log.info('SIGINT', { component });
            process.exit(0);
        });
        process.on('SIGTERM', () => {
            log.info('SIGTERM', { component });
            process.exit(0);
        });
        process.on('unhandledRejection', (error) => {
            log.error(`unhandledRejection: ${error.message}`, { component }, error);
            log.error(error);
            worker.handleExit(1);
        });
        process.on('uncaughtException', (error) => {
            log.error(`uncaughtException: ${error.message}`, { component }, error);
            log.error(error);
            worker.handleExit(1);
        });
    }
}

module.exports = new Bootstrap();

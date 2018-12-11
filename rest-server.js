const express = require('express');
const bodyParser = require('body-parser');

class RestServer {
    
    init(options, metricsArr) {
        this._metricsArr = metricsArr;
        const app = express();
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());

        // Get all thresholds (with description)
        app.get('/thresholds', (req, res) => {
            res.json(this.getMetricsIncludeDescr());
        });
 
        // Set given thresholds and return all threshold (without descriptions)
        app.put('/thresholds', (req, res, next) => {
            var error = false;
            try {
                Object.keys(req.body).forEach(function(key) {
                    metricsArr[key].set(req.body[key]);
                });
            }
            catch (err) {
                return next(err);
            }
            res.json(this.getMetrics());
            // res.end(JSON.stringify(req.body));
        });
        
        // run rest server
        // var server = app.listen(options.port, 'localhost', function () {
        var server = app.listen(options.port, function () {
                var host = server.address().address
            var port = server.address().port
            console.log("Hkube Alerts Threshold Manager is listening at http://%s:%s", host, port)
        });
    }

    /**
     * return metrics as object with metric names as key and metric value as value.
     */
    getMetrics() {
        let metrics = {};
        for (var i in this._metricsArr) {
            metrics[this._metricsArr[i].getFullName()] = this._metricsArr[i].get();
        }
        return metrics;
    }

    /**
     * return metrics as array of objects with name, value, descr properties.
     */
    getMetricsIncludeDescr() {
        let metrics = [];
        for (var i in this._metricsArr) {
            let metric = {
                name: this._metricsArr[i].getFullName(),
                value: this._metricsArr[i].get(),
                descr: this._metricsArr[i].getDescr()
            }
            metrics.push(metric);
        }
        return metrics;
    }
}

module.exports = new RestServer();
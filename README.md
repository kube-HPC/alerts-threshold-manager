[![Build Status](https://travis-ci.org/kube-HPC/alerts-threshold-manager.svg?branch=master)](https://travis-ci.org/kube-HPC/alerts-threshold-manager)
[![Coverage Status](https://coveralls.io/repos/github/kube-HPC/alerts-threshold-manager/badge.svg?branch=master)](https://coveralls.io/github/kube-HPC/alerts-threshold-manager?branch=master)


## Documentation

The **alerts-threshold-manager** manages the thresholds which are used in the prometheus alerts rules:
- It creates each threshold as a prometheus gauge metric.
- It enables to get and set the thresholds by a REST api:
  - **GET \<host>:\<port>/thresholds**
     Getting all threshold as a json list, each item include name, value and descr.
  - **PUT \<host>:\<port>/thresholds**
     Setting some thresholds with a body of style:
     *{
       thres1: value1,
       thres2: value2,
       ...
     }*
     Response body includes **all** thresholds in the same style.
 - Default values may be set using env variables for:
   -  Prometheus port: METRICS_PORT
   - REST port: REST_PORT
   - Each one of the thresholds: see [config.base.js](config/main/config.base.js)

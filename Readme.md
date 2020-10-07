# K6 load test example
For more info on K6 see [k6.io](https://k6.io/) or an introductory video from NDC here: https://www.youtube.com/watch?v=ajW011aaX4s (13:32)

## To install
Prerequisites: Docker ([Windows](https://docs.docker.com/docker-for-windows/install/)) installed and available on path

Optional (intellisense): [node](https://nodejs.org/) installed with `npm`, to install run `npm install`

## To run
From this directory
```
docker build . -t loadtest:latest
docker run loadtest
```
Alternatives:
* Powershell one-liner : `docker build . -t loadtest:latest; docker run loadtest`
* If npm is available: `npm test`

## Load test details
See [loadtest.js](loadtest.js)
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

## Sample load test output
      ✓ HTTP status must be 200
      ✓ Duration must not exceed 350ms
      ✓ Non-existing page HTTP status must be 404
      ✓ Non-existing page duration must not exceed 400ms
  
    ✓ checks.......................: 100.00% ✓ 4320 ✗ 0   
      data_received................: 20 MB   312 kB/s
      data_sent....................: 411 kB  6.4 kB/s
    ✓ frontpage_duration...........: avg=27.264035 min=20.2007 med=25.5754 max=90.7229  p(90)=33.45951 p(95)=36.876955 p(99)=46.69039 p(99.9)=90.43832 p(99.99)=90.694442
    ✓ frontpage_successful_loads...: 100.00% ✓ 720  ✗ 0
      http_req_blocked.............: avg=1.12ms    min=100ns   med=300ns   max=189.45ms p(90)=600ns    p(95)=800ns     p(99)=36.44ms  p(99.9)=168.07ms p(99.99)=188.59ms
      http_req_connecting..........: avg=128.96µs  min=0s      med=0s      max=7.93ms   p(90)=0s       p(95)=0s        p(99)=5.53ms   p(99.9)=6.99ms   p(99.99)=7.91ms
    ✓ http_req_duration............: avg=23.56ms   min=16.01ms med=21.64ms max=1.63s    p(90)=28.57ms  p(95)=32.35ms   p(99)=42.77ms  p(99.9)=177.1ms  p(99.99)=1.05s
      http_req_receiving...........: avg=315.73µs  min=21.3µs  med=97.3µs  max=11.26ms  p(90)=249.05µs p(95)=2.26ms    p(99)=4.1ms    p(99.9)=9.07ms   p(99.99)=10.76ms
      http_req_sending.............: avg=62.31µs   min=15µs    med=56.3µs  max=490.8µs  p(90)=102.4µs  p(95)=118.4µs   p(99)=169.86µs p(99.9)=256.7µs  p(99.99)=402.73µs
      http_req_tls_handshaking.....: avg=862.9µs   min=0s      med=0s      max=124.7ms  p(90)=0s       p(95)=0s        p(99)=30.63ms  p(99.9)=106.84ms p(99.99)=124.39ms
    ✓ http_req_waiting.............: avg=23.18ms   min=15.92ms med=21.3ms  max=1.63s    p(90)=27.76ms  p(95)=31.62ms   p(99)=42.34ms  p(99.9)=176.97ms p(99.99)=1.05s
      http_reqs....................: 4320    66.986717/s
      iteration_duration...........: avg=3.59s     min=2.18s   med=3.6s    max=5.66s    p(90)=4.46s    p(95)=4.63s     p(99)=4.9s     p(99.9)=5.24s    p(99.99)=5.62s
      iterations...................: 720     11.164453/s
      vus..........................: 1       min=1  max=50
      vus_max......................: 50      min=50 max=50
import http from "k6/http";
import { check, sleep } from "k6";
import { Rate, Trend } from "k6/metrics";

// Custom metrics to track frontpage success rates and duration trends
const frontpageSuccess = "frontpage_successful_loads";
const frontpageSuccessRate = new Rate(frontpageSuccess);
const frontpageDuration = "frontpage_duration";
const frontpageDurationTrend = new Trend(frontpageDuration);

export let options = {
  summaryTrendStats: ["avg", "min", "med", "max", "p(90)", "p(95)", "p(99)", "p(99.9)", "p(99.99)"],
  vus: 5, // start at 5 virtual users, go up to 10 users over 5s, up to 25 over next 5s, up to 50 over next 10s and stay at 50 users for 40s
  stages: [
    { duration: "5s", target: 10 },
    { duration: "5s", target: 25 },
    { duration: "10s", target: 50 },
    { duration: "40s", target: 50 }, // "1m30s"
  ],
  thresholds: {
    // We want the average to be 50ms or less, the 95th percentile of all HTTP request durations to be less than 100ms, the 99th percentile under 500ms, and the 99.9th percentile to be less than a second
    "http_req_duration": ["avg<50", "p(95)<100", "p(99)<500", "p(99.9)<1000"],
    "http_req_waiting": ["avg<50"],
    // Thresholds based on the custom metric we defined and use to track application failures
    "checks": [
      // Global check failure rate should be less than 0.5%
      "rate<99.5",
      // Abort the test early if we ever reach 1% or more check failures
      { threshold: "rate<=99", abortOnFail: true },
    ],
    [frontpageSuccess]: ["rate<99.9"],
    [frontpageDuration]: ["p(99.9)<350"]
  }
};

const httpChecks = {
  "HTTP status must be 200": r => r.status == 200,
  "Duration must not exceed 350ms": r => r.timings.duration < 350
}

export default function () {
  const frontpage = http.get("https://www.skovvart.dk/");
  frontpageSuccessRate.add(check(frontpage, httpChecks));
  frontpageDurationTrend.add(frontpage.timings.duration);

  sleep(Math.random() + 1) // wait 1-2s before requesting new page(s)

  const responses = http.batch(
    {
      "Blog post": "https://www.skovvart.dk/blog/how-is-sapper-different-from-next/",
      "Non-existing page": "https://www.skovvart.dk/404-error-page-does-not-exist"
    }
  );
  check(responses["Blog post"], httpChecks);
  check(responses["Non-existing page"], {
    "Non-existing page HTTP status must be 404": r => r.status == 404,
    "Non-existing page duration must not exceed 400ms": r => r.timings.duration < 400
  });

  sleep(Math.random() * 2 + 1); // Random sleep between 1s and 3s per virtual user cycle before repeating user loop
}
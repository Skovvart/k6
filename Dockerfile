FROM loadimpact/k6
COPY ["loadtest.js", "."]
ENTRYPOINT ["k6", "run", "loadtest.js"]
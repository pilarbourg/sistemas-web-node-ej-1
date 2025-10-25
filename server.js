const { log } = require("console");
const os = require("os");
const process = require("process");
const fs = require("fs");
const http = require("http");

console.log("|------------| System Information |------------|");
console.log("OS: " + os.type() + " " + os.release());
console.log("User Home Directory: " + os.homedir());
console.log("Hostname: " + os.hostname());
console.log(
  "Network Details: " + JSON.stringify(os.networkInterfaces(), null, 2)
);
console.log("OS Version Number: " + os.release());
console.log("Total RAM: " + os.totalmem() + " bytes");

console.log("|------------| Node.js Version " + process.version + " |------------|");

const config = JSON.parse(fs.readFileSync("./config.json"));

setInterval(() => {
  console.log("|------------| Periodic System Stats |------------|");
  if (config.showCPU) console.log("CPU Cores: " + os.cpus().length);
  if (config.showCPU) console.log("Load Average: " + os.loadavg().join(", "));
  if (config.showMemory) console.log("Free RAM: " + os.freemem() + " bytes");
  if (config.showSystemUptime)
    console.log("System Uptime: " + os.uptime() + " seconds");
  if (config.showNodeUptime)
    console.log("Node.js Process Uptime: " + process.uptime() + " seconds");
}, config.interval);

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Node.js System Monitor Running\n");
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

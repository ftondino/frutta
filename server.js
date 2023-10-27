const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require("path");

const app = express();

app.use(express.static(__dirname + "/dist/frutta"));

app.use(
  "/api",
  createProxyMiddleware({
    target: "https://fruityvice.com",
    changeOrigin: true,
  })
);

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/frutta/index.html"));
});

app.listen(process.env.PORT || 8080);

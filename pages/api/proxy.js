const YAML = require("yaml");
const TOML = require("toml");
const fs = require('fs')
const path = require('path')
const axios = require("axios");
const atob = require("atob");

module.exports = async (req, res) => {
  const url = req.query.url;
  if (url === undefined) {
    res.status(400).send("Missing parameter: url");
    return;
  }

  console.log(`Fetching url: ${url}`);
  let configFile = null;
  try {
    const result = await axios({
      url,
      headers: {
        "User-Agent":
          "ClashX Pro/1.72.0.4 (com.west2online.ClashXPro; build:1.72.0.4; macOS 12.0.1) Alamofire/5.4.4",
      },
    });
    configFile = result.data;
  } catch (error) {
    res.status(400).send(`Unable to get url, error: ${error}`);
    return;
  }

  let config = null;
  try {
    config = YAML.parse(configFile);
  } catch (error) {
  }

  const response = YAML.stringify({ config });
  res.status(200).send(response);
};

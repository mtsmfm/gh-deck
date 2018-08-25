const { environment } = require("@rails/webpacker");
const typescript = require("./loaders/typescript");

environment.loaders.append("typescript", typescript);
environment.loaders.append("graphql-tag", require("./loaders/graphql-tag"));
module.exports = environment;

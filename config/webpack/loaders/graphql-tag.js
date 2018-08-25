module.exports = {
  test: /\.(graphql|gql)$/,
  exclude: /node_modules/,
  use: {
    loader: "graphql-tag/loader"
  }
};

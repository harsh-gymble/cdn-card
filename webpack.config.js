const path = require("path");

module.exports = {
  entry: "./src/Card.js", // Entry file
  output: {
    filename: "card.bundle.js",
    path: path.resolve(__dirname, "public"), // Save output in public folder
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
      },
    ],
  },
};

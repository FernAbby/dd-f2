

export default {
  devtool: 'source-map',
  input: 'src/index.js',
  output: {
    filename: 'build/index.js',
  },
  resolve: {
    extensions: ['.js','.json','.web.js','.mjs'],
  },
}

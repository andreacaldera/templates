require('babel-register')({ // TODO move these into .babelrc
  presets: ['es2015', 'react'],
});
require('./server');

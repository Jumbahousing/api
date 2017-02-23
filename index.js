'use strict';

const System = require('ari-api').System;


// Setup system
let system = new System({
  configPath: './config.json',
  packagePath: './package.json'
});

system.init();

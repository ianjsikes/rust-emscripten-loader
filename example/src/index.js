const wasm = require('./lib.rs');

wasm.then(module => {
  console.log('Calling rust functions!');
  module.hello();
  console.log(module.doub(21));
})

const wasm = require('./main.rs')
const index = require('./index.html')

wasm.initialize().then(module => {
  const doub = module.cwrap('doub', 'number', ['number'])
  console.log('Calling rust functions!')
  console.log(doub(21))
})

require('rust-emscripten-loader?target=wasm&outName=bundle/out!./main.rs');

const script = document.createElement('script');
script.text = `
  if (typeof WebAssembly === 'object') {
    var Module = {};
    var req = new XMLHttpRequest();
    req.open('GET', 'bundle/out.wasm');
    req.responseType = 'arraybuffer';
    req.send();

    req.onload = function() {
      Module.wasmBinary = req.response;
      var script = document.createElement('script');
      script.src = 'bundle/out.js';
      document.body.appendChild(script);
    };
  } else {
    document.getElementById('container').innerHTML = 'Your browser doesn\\'t support WebAssembly!';
  }
`;
document.body.appendChild(script);

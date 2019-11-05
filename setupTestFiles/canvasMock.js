const gl = require("gl")(10, 10)

HTMLCanvasElement.prototype.getContext = () => {
  return gl
}

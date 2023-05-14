import { OrangeGpio, ModeCode } from '../dist/core'
const PC = new OrangeGpio('PC')
PC.setMode(1, ModeCode.OutPut)
setInterval(() => {
  PC.setVal(1, PC.getVal(1) ? 0 : 1)
}, 200)

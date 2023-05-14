import { OrangeGpio, ModeCode } from '../dist/core'
const PC = new OrangeGpio('PC')

PC.setMode(12, ModeCode.OutPut)
PC.setMode(13, ModeCode.OutPut)
PC.setMode(10, ModeCode.OutPut)
PC.setMode(1, ModeCode.OutPut)

PC.setVal(13, PC.getVal(13) ? 0 : 1)

setInterval(() => {
  PC.setVal(1, PC.getVal(1) ? 0 : 1)
  PC.setVal(10, PC.getVal(10) ? 0 : 1)
  PC.setVal(12, PC.getVal(12) ? 0 : 1)
  PC.setVal(13, PC.getVal(13) ? 0 : 1)
}, 200)

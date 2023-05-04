import { GpioControl } from './index.js'
const config = {
  PC: {
    base_address: 0x0300b000,
    base_offset: 2 * 0x0024 + 0,
    pins: [
      {
        DAT: {
          offset: 4,
          length: 1,
        },
        DRV: {
          offset: 2,
          length: 1,
        },
        PUL: {
          offset: 2,
          length: 1,
        },
      },
    ],
  },
}
const gpio = new GpioControl(config.PC.base_address, config.PC.base_offset)

gpio.setVal(config.PC.CFG.offset, gpio.getVal(0) & 0x77777717)
gpio.setVal(1, gpio.getVal(1) & 0x77777717)
gpio.setVal(4, gpio.getVal(4) ^ 0x00003000)

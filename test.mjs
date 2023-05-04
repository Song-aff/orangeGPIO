import { GpioControl } from './index.js'

const GPIO = { PC: 'PC' }

const config = {
  PC: {
    base_address: 0x0300b000,
    base_offset: 2 * 0x0024 + 0,
    pins: {
      5: {
        DAT: {
          offset: 4,
          bit: 5,
          length: 1,
        },
        DRV: {
          offset: 0,
          bit: 20,
          length: 3,
        },
        PUL: {
          offset: 7,
          bit: 10,
          length: 2,
        },
      },
      6: {
        DAT: {
          offset: 4,
          bit: 6,
          length: 1,
        },
        DRV: {
          offset: 0,
          bit: 24,
          length: 3,
        },
        PUL: {
          offset: 7,
          bit: 12,
          length: 2,
        },
      },
      7: {
        DAT: {
          offset: 4,
          bit: 7,
          length: 1,
        },
        DRV: {
          offset: 0,
          bit: 28,
          length: 3,
        },
        PUL: {
          offset: 7,
          bit: 14,
          length: 2,
        },
      },
      8: {
        DAT: {
          offset: 4,
          bit: 8,
          length: 1,
        },
        DRV: {
          offset: 0,
          bit: 0,
          length: 3,
        },
        PUL: {
          offset: 7,
          bit: 16,
          length: 2,
        },
      },
      9: {
        DAT: {
          offset: 4,
          bit: 9,
          length: 1,
        },
        DRV: {
          offset: 0,
          bit: 4,
          length: 3,
        },
        PUL: {
          offset: 7,
          bit: 18,
          length: 2,
        },
      },
      10: {
        DAT: {
          offset: 4,
          bit: 10,
          length: 1,
        },
        DRV: {
          offset: 0,
          bit: 8,
          length: 3,
        },
        PUL: {
          offset: 7,
          bit: 20,
          length: 2,
        },
      },
      11: {
        DAT: {
          offset: 4,
          bit: 11,
          length: 1,
        },
        DRV: {
          offset: 0,
          bit: 12,
          length: 3,
        },
        PUL: {
          offset: 7,
          bit: 22,
          length: 2,
        },
      },
      14: {
        DAT: {
          offset: 4,
          bit: 14,
          length: 1,
        },
        DRV: {
          offset: 0,
          bit: 24,
          length: 3,
        },
        PUL: {
          offset: 7,
          bit: 28,
          length: 2,
        },
      },
      15: {
        DAT: {
          offset: 4,
          bit: 15,
          length: 1,
        },
        DRV: {
          offset: 0,
          bit: 28,
          length: 3,
        },
        PUL: {
          offset: 7,
          bit: 30,
          length: 2,
        },
      },
    },
  },
}

// class OrangeGpio {
//   constructor(GPIO) {
//     if (config[GPIO]) {
//       const gpio = new GpioControl(
//         config.PC.base_address,
//         config.PC.base_offset
//       )
//     }
//   }
// }
const gpio = new GpioControl(config.PC.base_address, config.PC.base_offset)
gpio.setVal(config.PC.CFG.offset, gpio.getVal(0) & 0x77777717)
gpio.setVal(1, gpio.getVal(1) & 0x77777717)
gpio.setVal(4, gpio.getVal(4) ^ 0x00003000)

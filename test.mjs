import { GpioControl } from './index.js'

const group = { PC: 'PC' }

// const register = {
//   CFG:
// }
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
function setBitVal(number, startBit, val, length = 1) {
  var mask = (1 << length) - 1 // 生成掩码，将要修改的位数全部变为1
  mask <<= startBit // 将掩码移动到起始位
  val <<= startBit // 将要设置的值移动到起始位，支持二进制、十进制、十六进制输入
  val &= mask // 通过掩码限制val的取值范围
  if (val) {
    number |= mask // 将掩码应用到原数上，将要修改的位数全部变为1
    number &= ~(mask ^ val) // 将掩码和要设置的值应用到原数上
  } else {
    mask = ~mask // 取反掩码，将要修改的位数全部变为0
    number &= mask // 将掩码应用到原数上，将对应位变为0
  }
  return number
}
class OrangeGpio {
  constructor(group) {
    if (config[group]) {
      this.group = group
      this.GpioControl = new GpioControl(
        config[group].base_address,
        config[group].base_offset
      )
    }
  }
  setMode(pin, modeCode) {
    const offset = Math.floor(pin / 8)
    const current = this.GpioControl.getVal(offset)
    this.GpioControl.setVal(offset, setBitVal(current, pin % 8, modeCode, 3))
  }
  setVal(pin, val) {
    const offset = 4
    const current = this.GpioControl.getVal(offset)
    this.GpioControl.setVal(offset, setBitVal(current, pin, val))
  }
}
// const gpio = new GpioControl(config.PC.base_address, config.PC.base_offset)

// gpio.setVal(config.PC.CFG.offset, gpio.getVal(0) & 0x77777717)
// gpio.setVal(1, gpio.getVal(1) & 0x77777717)
// gpio.setVal(4, gpio.getVal(4) ^ 0x00003000)
// console.log(setBitVal(0b11110000, 0, 1, 3).toString(2))

// const PC = new OrangeGpio('PC')
// PC.setMode(1, 'xxx')
// PC.setPull(1, 'xxx')
// PC.setInt(1, 'xxx')
// PC.setVal(1, 0)

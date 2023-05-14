import { GpioControl } from '../index.js'

type Group = 'PC' | 'PH'
export enum ModeCode {
  Input = 0b000,
  OutPut = 0b001,
  Disable = 0b111,
}
const config = {
  PC: {
    base_address: 0x0300b000,
    base_offset: 2 * 0x0024 + 0,
  },
  PH: {
    base_address: 0x0300b000,
    base_offset: 7 * 0x0024 + 0,
  },
}

export function setBitVal(
  number: number,
  startBit: number,
  val: number,
  length = 1
) {
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

export class OrangeGpio {
  group: Group
  GpioControl: GpioControl
  constructor(group: Group) {
    if (config[group]) {
      this.group = group
      this.GpioControl = new GpioControl(
        config[group].base_address,
        config[group].base_offset
      )
    }
  }
  /**
   * 设置模式
   */
  setMode(pin: number, modeCode: ModeCode) {
    const offset = Math.floor(pin / 8)
    const current = this.GpioControl.getVal(offset)
    this.GpioControl.setVal(
      offset,
      setBitVal(current, (pin % 8) * 4, modeCode, 3)
    )
  }
  /**
   * 设置上下拉
   */
  setPull(pin, modeCode) {
    //TODO
  }
  /**
   * 设置中断
   */
  setInt(pin, modeCode) {
    //TODO
  }
  /**
   * 设置引脚值
   */
  setVal(pin, val) {
    const offset = 4
    const current = this.GpioControl.getVal(offset)
    this.GpioControl.setVal(offset, setBitVal(current, pin, val))
  }
  /**
   * 获取引脚值
   */
  getVal(pin) {
    const offset = 4
    const mask = 1 << pin
    return (this.GpioControl.getVal(offset) & mask) >> pin
  }
}

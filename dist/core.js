"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrangeGpio = exports.setBitVal = exports.ModeCode = void 0;
var index_js_1 = require("../index.js");
var ModeCode;
(function (ModeCode) {
    ModeCode[ModeCode["Input"] = 0] = "Input";
    ModeCode[ModeCode["OutPut"] = 1] = "OutPut";
    ModeCode[ModeCode["Disable"] = 7] = "Disable";
})(ModeCode = exports.ModeCode || (exports.ModeCode = {}));
var config = {
    PC: {
        base_address: 0x0300b000,
        base_offset: 2 * 0x0024 + 0,
    },
    PH: {
        base_address: 0x0300b000,
        base_offset: 7 * 0x0024 + 0,
    },
};
function setBitVal(number, startBit, val, length) {
    if (length === void 0) { length = 1; }
    var mask = (1 << length) - 1; // 生成掩码，将要修改的位数全部变为1
    mask <<= startBit; // 将掩码移动到起始位
    val <<= startBit; // 将要设置的值移动到起始位，支持二进制、十进制、十六进制输入
    val &= mask; // 通过掩码限制val的取值范围
    if (val) {
        number |= mask; // 将掩码应用到原数上，将要修改的位数全部变为1
        number &= ~(mask ^ val); // 将掩码和要设置的值应用到原数上
    }
    else {
        mask = ~mask; // 取反掩码，将要修改的位数全部变为0
        number &= mask; // 将掩码应用到原数上，将对应位变为0
    }
    return number;
}
exports.setBitVal = setBitVal;
var OrangeGpio = /** @class */ (function () {
    function OrangeGpio(group) {
        if (config[group]) {
            this.group = group;
            this.GpioControl = new index_js_1.GpioControl(config[group].base_address, config[group].base_offset);
        }
    }
    /**
     * 设置模式
     */
    OrangeGpio.prototype.setMode = function (pin, modeCode) {
        var offset = Math.floor(pin / 8);
        var current = this.GpioControl.getVal(offset);
        this.GpioControl.setVal(offset, setBitVal(current, (pin % 8) * 4, modeCode, 3));
    };
    /**
     * 设置上下拉
     */
    OrangeGpio.prototype.setPull = function (pin, modeCode) {
        //TODO
    };
    /**
     * 设置中断
     */
    OrangeGpio.prototype.setInt = function (pin, modeCode) {
        //TODO
    };
    /**
     * 设置引脚值
     */
    OrangeGpio.prototype.setVal = function (pin, val) {
        var offset = 4;
        var current = this.GpioControl.getVal(offset);
        this.GpioControl.setVal(offset, setBitVal(current, pin, val));
    };
    /**
     * 获取引脚值
     */
    OrangeGpio.prototype.getVal = function (pin) {
        var offset = 4;
        var mask = 1 << pin;
        return (this.GpioControl.getVal(offset) & mask) >> pin;
    };
    return OrangeGpio;
}());
exports.OrangeGpio = OrangeGpio;

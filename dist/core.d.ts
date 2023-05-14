import { GpioControl } from '../index.js';
declare type Group = 'PC' | 'PH';
export declare enum ModeCode {
    Input = 0,
    OutPut = 1,
    Disable = 7
}
export declare function setBitVal(number: number, startBit: number, val: number, length?: number): number;
export declare class OrangeGpio {
    group: Group;
    GpioControl: GpioControl;
    constructor(group: Group);
    /**
     * 设置模式
     */
    setMode(pin: number, modeCode: ModeCode): void;
    /**
     * 设置上下拉
     */
    setPull(pin: any, modeCode: any): void;
    /**
     * 设置中断
     */
    setInt(pin: any, modeCode: any): void;
    /**
     * 设置引脚值
     */
    setVal(pin: any, val: any): void;
    /**
     * 获取引脚值
     */
    getVal(pin: any): number;
}
export {};

//% color="#0078D7" weight=100 icon="\uf072"
namespace XGZP6859D {

    const ADDR = 0x6D
    const REG_CMD = 0x30
    const CMD_MESURE = 0x0A
    const K = 512

    //% block="lire capteur XGZP6859D"
    export function lireCapteur(): void {
        pins.i2cWriteNumber(ADDR, (REG_CMD << 8) | CMD_MESURE, NumberFormat.UInt16BE)
        basic.pause(5)
    }

    //% block="pression en kPa"
    export function pressionKPa(): number {
        pins.i2cWriteNumber(ADDR, 0x04, NumberFormat.UInt8BE)
        let buf = pins.i2cReadBuffer(ADDR, 3)
        let raw = (buf[0] << 16) | (buf[1] << 8) | buf[2]
        if (raw >= 0x800000) raw = raw - 0x1000000
        return raw / K / 1000.0
    }

    //% block="température en °C"
    export function temperature(): number {
        pins.i2cWriteNumber(ADDR, 0x07, NumberFormat.UInt8BE)
        let buf = pins.i2cReadBuffer(ADDR, 2)
        let raw = (buf[0] << 8) | buf[1]
        if (raw >= 0x8000) raw = raw - 0x10000
        return raw / 256.0
    }
}

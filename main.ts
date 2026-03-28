//% color="#0078D7" weight=100 icon="\uf072"
//% block="XGZP6859D"
namespace XGZP6859D {

    //% block="lire capteur XGZP6859D"
    //% weight=100
    export function lireCapteur(): void {
        let cmd = 0x30 * 256 + 0x0A
        pins.i2cWriteNumber(0x6D, cmd, NumberFormat.UInt16BE)
        basic.pause(5)
    }

    //% block="pression en kPa"
    //% weight=90
    export function pressionKPa(): number {
        pins.i2cWriteNumber(0x6D, 0x04, NumberFormat.UInt8BE)
        let buf = pins.i2cReadBuffer(0x6D, 3)
        let b0 = buf[0]
        let b1 = buf[1]
        let b2 = buf[2]
        let raw = b0 * 65536 + b1 * 256 + b2
        if (raw >= 8388608) {
            raw = raw - 16777216
        }
        return raw / 512000
    }

    //% block="température en °C"
    //% weight=80
    export function temperature(): number {
        pins.i2cWriteNumber(0x6D, 0x07, NumberFormat.UInt8BE)
        let buf = pins.i2cReadBuffer(0x6D, 2)
        let b0 = buf[0]
        let b1 = buf[1]
        let raw = b0 * 256 + b1
        if (raw >= 32768) {
            raw = raw - 65536
        }
        return raw / 256
    }
}

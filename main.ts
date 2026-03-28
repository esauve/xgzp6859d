//% color="#0078D7" weight=100 icon="\uf072"
//% block="XGZP6859D"
namespace XGZP6859D {

    //% block="lire capteur XGZP6859D"
    //% weight=100
    export function lireCapteur(): void {
        pins.i2cWriteNumber(0x6D, 0x30, NumberFormat.UInt8BE)
        pins.i2cWriteNumber(0x6D, 0x0A, NumberFormat.UInt8BE)
        basic.pause(20)
    }

//% block="pression en Pa"
//% weight=90
export function pressionPa(): number {
    let r6 = 0
    let r7 = 0
    let r8 = 0
    pins.i2cWriteNumber(0x6D, 0x06, NumberFormat.UInt8BE)
    r6 = pins.i2cReadNumber(0x6D, NumberFormat.UInt8BE)
    pins.i2cWriteNumber(0x6D, 0x07, NumberFormat.UInt8BE)
    r7 = pins.i2cReadNumber(0x6D, NumberFormat.UInt8BE)
    pins.i2cWriteNumber(0x6D, 0x08, NumberFormat.UInt8BE)
    r8 = pins.i2cReadNumber(0x6D, NumberFormat.UInt8BE)
    let raw = r6 * 65536 + r7 * 256 + r8
    if (raw >= 8388608) {
        return (raw - 16777216) / 512
    }
    if (raw == 8388607) {
        return 40000
    }
    return raw / 512
}
    //% block="pression en kPa"
    //% weight=89
    export function pressionKPa(): number {
        return pressionPa() / 1000
    }

    //% block="température en °C"
    //% weight=80
    export function temperature(): number {
        pins.i2cWriteNumber(0x6D, 0x09, NumberFormat.UInt8BE)
        let msb = pins.i2cReadNumber(0x6D, NumberFormat.UInt8BE)
        let lsb = pins.i2cReadNumber(0x6D, NumberFormat.UInt8BE)
        let raw = msb * 256 + lsb
        if (raw >= 32768) {
            raw = raw - 65536
        }
        return raw / 256
    }
}

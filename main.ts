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
        pins.i2cWriteNumber(0x6D, 0x07, NumberFormat.UInt8BE)
        let msb = pins.i2cReadNumber(0x6D, NumberFormat.UInt8BE)
        let lsb = pins.i2cReadNumber(0x6D, NumberFormat.UInt8BE)
        let raw = msb * 256 + lsb
        if (raw >= 32768) {
            raw = raw - 65536
        }
        retrun (raw / 512) * -1
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

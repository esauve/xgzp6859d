//% color="#0078D7" weight=100 icon="\uf072"
//% block="XGZP6859D"
namespace XGZP6859D {

    function lire(): number {
        let cmd = pins.createBuffer(2)
        cmd[0] = 0x30
        cmd[1] = 0x0A
        pins.i2cWriteBuffer(0x6D, cmd)
        basic.pause(50)
        pins.i2cWriteNumber(0x6D, 0x06, NumberFormat.UInt8BE)
        let r6 = pins.i2cReadNumber(0x6D, NumberFormat.UInt8BE)
        pins.i2cWriteNumber(0x6D, 0x07, NumberFormat.UInt8BE)
        let r7 = pins.i2cReadNumber(0x6D, NumberFormat.UInt8BE)
        pins.i2cWriteNumber(0x6D, 0x08, NumberFormat.UInt8BE)
        let r8 = pins.i2cReadNumber(0x6D, NumberFormat.UInt8BE)
        let raw = r6 * 65536 + r7 * 256 + r8
        if (raw == 8388607) {
            return 40000
        }
        if (raw >= 8388608) {
            return (raw - 16777216) / 512
        }
        return raw / 512
    }

    //% block="pression en Pa"
    //% weight=100
    export function pressionPa(): number {
        return Math.round(lire() * 1000) / 1000
    }

    //% block="pression en kPa"
    //% weight=90
    export function pressionKPa(): number {
        return Math.round(lire() / 1000 * 1000) / 1000
    }
}

//% color="#0078D7" weight=100 icon="\uf0e4"
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
        if (raw <= 8388607) {
            return raw / 210
        }
        return (raw - 16777216) / 209
    }

    //% block="pression 0-40kPa en Pa"
    //% weight=100
    export function pressionPa(): number {
        let val = lire()
        if (val > 40000) return 40000
        if (val < 0) return 0
        return val
    }

    //% block="pression 0-40kPa en kPa"
    //% weight=90
    export function pressionKPa(): number {
        let val = lire() / 1000
        if (val > 40) return 40
        if (val < 0) return 0
        return val
    }
}

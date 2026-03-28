//% color="#0078D7" weight=100 icon="\uf072"
//% block="XGZP6859D"
namespace XGZP6859D {

    //% block="lire capteur XGZP6859D"
    //% weight=100
    export function lireCapteur(): void {
        let buf = pins.createBuffer(2)
        buf[0] = 0x30
        buf[1] = 0x0A
        pins.i2cWriteBuffer(0x6D, buf)
        basic.pause(20)
    }

    //% block="pression en kPa"
    //% weight=90
    export function pressionKPa(): number {
        let reg = pins.createBuffer(1)
        reg[0] = 0x06
        pins.i2cWriteBuffer(0x6D, reg)
        let data = pins.i2cReadBuffer(0x6D, 3)
        let raw = data[0] * 65536 + data[1] * 256 + data[2]
        if (raw >= 8388608) {
            raw = raw - 16777216
        }
        // K=512 pour 0-40kPa, résultat en Pa puis converti en kPa
        return raw / 512 / 1000
    }

    //% block="température en °C"
    //% weight=80
    export function temperature(): number {
        let reg = pins.createBuffer(1)
        reg[0] = 0x09
        pins.i2cWriteBuffer(0x6D, reg)
        let data = pins.i2cReadBuffer(0x6D, 2)
        let raw = data[0] * 256 + data[1]
        if (raw >= 32768) {
            raw = raw - 65536
        }
        return raw / 256
    }
}

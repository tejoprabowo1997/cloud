import CryptoJS from 'crypto-js'

class CryptoJSUtil {
  decrypt(value) {
    const privateKey = CryptoJS.enc.Utf8.parse(
      '6il7YCRSqIOB9NooY225lPKQ0KuAF/nkFX6cY3vJkS0='
    )
    const IV = CryptoJS.enc.Utf8.parse('0123456789ABCDEF')
    return JSON.parse(
      CryptoJS.AES.decrypt(value, privateKey, {
        iv: IV,
        mode: CryptoJS.mode.CFB,
        padding: CryptoJS.pad.AnsiX923,
      }).toString(CryptoJS.enc.Utf8)
    )
  }
}

export default new CryptoJSUtil()

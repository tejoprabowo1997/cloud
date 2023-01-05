import { Injectable, NestMiddleware } from '@nestjs/common'
import * as CryptoJS from 'crypto-js'

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (!req.headers.authorization) {
      return res.status(401).send({ message: 'Unauthorized' })
    }
    const encrypted = req.headers.authorization
    const key = 'my-secret-key'
    const decrypted = CryptoJS.AES.decrypt(encrypted, key).toString(
      CryptoJS.enc.Utf8,
    )
    if (decrypted !== 'secret-key-app') {
      return res.status(401).send({ message: 'Unauthorized' })
    }
    req.headers.authorization = decrypted

    next()
  }
}

import { Injectable, PipeTransform } from '@nestjs/common'
import * as path from 'path'
import * as sharp from 'sharp'

@Injectable()
export class CoverPipe
  implements PipeTransform<Express.Multer.File, Promise<string>>
{
  async transform(cover: Express.Multer.File): Promise<string> {
    const filename = Date.now() + Math.round(Math.random() * 1e9) + '.webp'
    await sharp(cover.buffer)
      .webp({ quality: 100 })
      .toFile(path.join('public/images/payment_gateway/cover', filename))

    return filename
  }
}

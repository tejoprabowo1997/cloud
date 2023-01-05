import { Injectable, PipeTransform } from '@nestjs/common'
import * as path from 'path'
import * as sharp from 'sharp'

@Injectable()
export class AvatarPipe
  implements PipeTransform<Express.Multer.File, Promise<string>>
{
  async transform(avatar: Express.Multer.File): Promise<string> {
    const filename = Date.now() + Math.round(Math.random() * 1e9) + '.webp'

    await sharp(avatar.buffer)
      .resize(150, 150)
      .webp({ quality: 100 })
      .toFile(path.join('public/images/profile/avatar', filename))

    return filename
  }
}

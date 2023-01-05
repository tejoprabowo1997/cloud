import { Injectable } from '@nestjs/common'

@Injectable()
export class AvatarService {
  resInfoAvatarUploaded(avatar: string): object {
    return {
      imgName: avatar,
      imgLink: `${process.env.APP_DOMAIN}/public/images/profile/avatar/${avatar}`,
    }
  }
}

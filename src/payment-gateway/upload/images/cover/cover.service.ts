import { Injectable } from '@nestjs/common'

@Injectable()
export class CoverService {
  resInfoCoverUploaded(cover: string): object {
    return {
      imgName: cover,
      imgLink: `${process.env.APP_DOMAIN}/public/images/payment_gateway/cover/${cover}`,
    }
  }

  resInfoCoverDeleted(cover: string): object {
    return {
      status: `Cover image ${cover} has deleted`,
    }
  }
}

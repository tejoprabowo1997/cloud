import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { CoverPipe } from './cover.pipe'
import { CoverService } from './cover.service'
import { unlinkSync } from 'fs'
import * as path from 'path'

@Controller('/payment_gateway')
export class CoverController {
  constructor(private readonly coverService: CoverService) {}

  @Post('/upload/images/cover')
  @UseInterceptors(FileInterceptor('cover'))
  uploadFile(@UploadedFile(CoverPipe) cover: string): object {
    return this.coverService.resInfoCoverUploaded(cover)
  }

  @Post('/delete/images/cover')
  deleteFile(@Body() body): any {
    const cover = body.cover
    unlinkSync(path.join('public/images/payment_gateway/cover', cover))
    return this.coverService.resInfoCoverDeleted(cover)
  }
}

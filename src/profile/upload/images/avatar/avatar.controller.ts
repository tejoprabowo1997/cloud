import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { AvatarService } from './avatar.service'
import { AvatarPipe } from './avatar.pipe'

@Controller('/profile/upload/images/avatar')
export class AvatarController {
  readonly #folderSave: string
  constructor(private readonly avatarService: AvatarService) {}

  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  uploadFile(@UploadedFile(AvatarPipe) avatar: string): object {
    return this.avatarService.resInfoAvatarUploaded(avatar)
  }
}

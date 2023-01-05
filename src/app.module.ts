import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AvatarController } from './profile/upload/images/avatar/avatar.controller'
import { AvatarService } from './profile/upload/images/avatar/avatar.service'
import { AvatarModule } from './profile/upload/images/avatar/avatar.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { CoverController } from './payment-gateway/upload/images/cover/cover.controller'
import { CoverService } from './payment-gateway/upload/images/cover/cover.service'
import { CoverModule } from './payment-gateway/upload/images/cover/cover.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    AvatarModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '/public'),
      serveRoot: '/public/',
    }),
    CoverModule,
  ],
  controllers: [AppController, AvatarController, CoverController],
  providers: [AppService, AvatarService, CoverService],
})
export class AppModule {}

import express from 'express'
import cryptojsUtil from '../../util/cryptojs.util.js'
import multer from 'multer'
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import httpStatus from 'http-status'
dotenv.config()

class UploadRoute {
  constructor() {
    const router = express.Router()

    const multerStorage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'public/images')
      },
      filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1]
        cb(null, `${Date.now()}.webp`)
      },
    })

    const multerFilter = (req, file, cb) => {
      if (
        file.mimetype.split('/')[1] === 'jpeg' ||
        file.mimetype.split('/')[1] === 'svg' ||
        file.mimetype.split('/')[1] === 'png' ||
        file.mimetype.split('/')[1] === 'jpg' ||
        file.mimetype.split('/')[1] === 'JPG' ||
        file.mimetype.split('/')[1] === 'webp' ||
        file.mimetype.split('/')[1] === 'gif'
      ) {
        cb(null, true)
      } else {
        cb(new Error('Not image file!!'), false)
      }
    }
    const upload = multer({
      storage: multerStorage,
      fileFilter: multerFilter,
    })

    router.post(
      '/image/profile',
      (req, res, next) => {
        const { authorization } = req.headers
        if (!authorization) {
          return res.status(httpStatus.UNAUTHORIZED).send('ACCESS DENIED')
        }
        const keyAccess = cryptojsUtil.decrypt(authorization)
        if (keyAccess !== 'iroirostationmarketplace2022uploadprofileimage') {
          return res.status(httpStatus.UNAUTHORIZED).send('ACCESS DENIED')
        }
        next()
      },
      upload.single('imgProfile'),
      async (req, res) => {
        const { filename: image } = req.file
        await sharp(req.file.path)
          .resize(150, 150)
          .webp({ quality: 100 })
          .toFile(path.resolve(req.file.destination, 'profile', image))
        fs.unlinkSync(req.file.path)
        res.send(`${process.env.APP_DOMAIN}/images/profile/${image}`)
      }
    )

    return router
  }
}

export default new UploadRoute()

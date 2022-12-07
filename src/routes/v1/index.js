import express from 'express'
import uploadRoute from './upload.route.js'

class V1 {
  constructor() {
    const router = express.Router()
    const defaultRoutes = [
      {
        path: '/upload',
        route: uploadRoute,
      },
    ]

    defaultRoutes.forEach((route) => {
      router.use(route.path, route.route)
    })

    return router
  }
}

export default new V1()

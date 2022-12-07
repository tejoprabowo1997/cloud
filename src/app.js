import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import v1 from './routes/v1/index.js'
import dotenv from 'dotenv'
import httpStatus from 'http-status'
dotenv.config()

class App {
  constructor() {
    const app = express()

    if (process.env.DEVELOPMENT_MODE === 'true') {
      app.use(morgan('dev'))
    }

    app.use(
      helmet({
        crossOriginResourcePolicy: false,
      })
    )
    app.use(express.json({ limit: '32mb' }))
    app.use(express.urlencoded({ extended: true, limit: '32mb' }))
    app.use(cors())
    app.options('*', cors())

    app.use(express.static('public'))
    app.use('/api/v1', v1)

    app.use('/', (req, res) => {
      res
        .status(httpStatus.NOT_FOUND)
        .send('The address to which it is addressed is not listed!')
    })

    this.__app = app
  }

  runServer() {
    return this.__app.listen(process.env.PORT_SERVER, () => {
      console.log(`🔥 Server listen on port ${process.env.PORT_SERVER} 🔥`)
    })
  }
}

export default new App()

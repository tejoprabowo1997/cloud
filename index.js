import app from './src/app.js'
import App from './src/app.js'

let server = App.runServer()

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log('Server closed')
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
}

const unexpectedErrorHandler = (error) => {
  console.log(error)
  exitHandler()
}

process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)

process.on('SIGTERM', () => {
  console.log('SIGTERM received')
  if (server) {
    server.close()
  }
})

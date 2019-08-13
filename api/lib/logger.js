const path = require('path')
const winston = require('winston')
require('winston-daily-rotate-file')

const logger = calledBy => {
  const format = [
      winston.format.label({ label: path.basename(calledBy) }),
      winston.format.timestamp({ format: 'HH:mm:ss' }),
      winston.format.splat(),
      winston.format.printf( info => `[${info.timestamp} - ${info.level}] [${info.label}]: ${info.message}`)
  ]

  const transport_warning = new (winston.transports.DailyRotateFile)({
    name: 'warning',
    dirname: 'logs',
    filename: 'errors-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    level: 'warn',
    zippedArchive: false,
    json: true,
    format: winston.format.combine(...format),
  })

  const transport_console = new (winston.transports.Console)({
    format: winston.format.combine(winston.format.colorize(), ...format),
  })

  return winston.createLogger({
    transports: [
        transport_warning,
        transport_console,
    ]
  })
}

module.exports = logger
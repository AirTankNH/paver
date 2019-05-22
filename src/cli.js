const yargs = require('yargs')

var argv = yargs
  .usage('Usage: $0 --service=[aws] --command=[command]')
  .option('service', {
    type: 'string',
    default: 'aws',
    description: 'Which service to use.'
  })
  .option('command', {
    type: 'string',
    description: 'Which command to use.'
  })
  .option('profile', {
    type: 'string',
    description: 'Which aws profile to use.'
  })
  .argv

const AWS = require('aws-sdk')
var credentials = new AWS.SharedIniFileCredentials({ profile: argv.profile })
AWS.config.credentials = credentials
AWS.config.update({ region: 'us-east-1' })

const Service = require('./services/' + argv.service)

const svc = new Service(AWS)

svc[argv.command](argv.manifest)


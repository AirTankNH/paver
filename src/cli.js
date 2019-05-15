const AWS = require('aws-sdk')
const AwsIntegration = require('./integrations/aws')

var credentials = new AWS.SharedIniFileCredentials({ profile: 'orgs' })
AWS.config.credentials = credentials
AWS.config.update({ region: 'us-east-1' })

const awsIntegration = new AwsIntegration(AWS)

awsIntegration.createDevEnv('paul+test3@airtank.com', 'Testy', 'McTesterson')

// awsIntegration.checkIfAccountExists('Testy_McTesterson_development')
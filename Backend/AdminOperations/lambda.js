
const awsServerlessExpress = require('aws-serverless-express')
const train= require('./train')
const server = awsServerlessExpress.createServer(train)

exports.handler = (event, context) => { awsServerlessExpress.proxy(server, event, context) }

const GoogleDrive = require('../src/googledrive')
const credentials = require('./credentials')

const gd = new GoogleDrive({
    clientId: credentials.clientId,
    clientSecret: credentials.clientSecret,
    scopes: credentials.scopes
})

const url = gd.authUrl()

console.log(url)
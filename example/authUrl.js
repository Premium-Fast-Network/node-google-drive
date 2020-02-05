const GoogleDrive = require('../src/googledrive')
const credentials = require('./credentials')

const gd = new GoogleDrive({
    clientId: credentials.clientId,
    clientSecret: credentials.clientSecret,
    scopes: credentials.scopes,
    redirect: 'http://localhost/oauth' // delete this object if you want to get token only after login or authorize
})

const url = gd.authUrl()

console.log(url)
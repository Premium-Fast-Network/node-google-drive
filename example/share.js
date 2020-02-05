const GoogleDrive = require('../src/googledrive')
const credentials = require('./credentials')

const gd = new GoogleDrive({
    clientId: credentials.clientId,
    clientSecret: credentials.clientSecret,
    scopes: credentials.scopes
})

// set user token
const setToken = gd.setToken(credentials.user)

// share files private to email
// gd.shareToEmail('GOOGLE-DRIVE-FILES-ID', 'EMAIL')

// share files public
gd.shareToPublic('GOOGLE-DRIVE-FILES-ID')
.then((res) => {
    console.log(res)
})
.catch((err) => {
    console.log(err)
})
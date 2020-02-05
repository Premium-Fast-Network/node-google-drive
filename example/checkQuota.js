const GoogleDrive = require('../src/googledrive')
const credentials = require('./credentials')

const gd = new GoogleDrive({
    clientId: credentials.clientId,
    clientSecret: credentials.clientSecret,
    scopes: credentials.scopes
})

// set user token
const setToken = gd.setToken(credentials.user)

// refresh token manual
const quota = gd.checkQuota()

quota.then((res) => {
    // your function for save new quota to database

    console.log(res.data)
})
.catch((err) => {
    console.log(err)
})
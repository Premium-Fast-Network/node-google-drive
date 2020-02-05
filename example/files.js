const GoogleDrive = require('../src/googledrive')
const credentials = require('./credentials')

const gd = new GoogleDrive({
    clientId: credentials.clientId,
    clientSecret: credentials.clientSecret,
    scopes: credentials.scopes
})

// set user token
const setToken = gd.setToken(credentials.user)

// get files
gd.getFiles('GOOGLE-DRIVE-FILES-ID')

// delete files
// gd.deleteFiles('GOOGLE-DRIVE-FILES-ID')

// copy files
// if you want use another query, please referer to google docs
// https://developers.google.com/drive/api/v3/reference/files/copy
// gd.copyFiles({fileId: 'GOOGLE-DRIVE-FILES-ID'})

// empty tash
// gd.emptyTrash()

.then((res) => {
    console.log(res)
})
.catch((err) => {
    console.log(err)
})
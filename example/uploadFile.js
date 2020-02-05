const GoogleDrive = require('../src/googledrive')
const credentials = require('./credentials')
const fs = require('fs')
const mime = require('mime-types')

const gd = new GoogleDrive({
    clientId: credentials.clientId,
    clientSecret: credentials.clientSecret,
    scopes: credentials.scopes
})

// set user token
const setToken = gd.setToken(credentials.user)

// fetch data file upload
const fileName = 'your-file-name-here.zip'
const fileStream = fs.createReadStream(fileName)
const fileMimeType = mime.lookup(fileName)
const fileSize = fs.statSync(fileName).size

// upload file without progress
// gd.uploadFile(fileName, fileStream, fileMimeType)

// upload file with progress bar
gd.uploadFileProgress(fileName, fileStream, fileMimeType, fileSize)
.then((res) => {
    console.log(res)
})
.catch((err) => {
    console.log(err)
})
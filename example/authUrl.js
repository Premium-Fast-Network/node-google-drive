const GoogleDrive = require('../src/googledrive')

const gd = new GoogleDrive({
    clientId: '777823450815-pe11i6mugqsk8n1c2mevglhgoaoge92l.apps.googleusercontent.com',
    clientSecret: 'phz92mGe-oyMayNOYf4a3vmA',
    scopes: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'email',
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.metadata',
        'https://www.googleapis.com/auth/drive.metadata.readonly',
        'https://www.googleapis.com/auth/drive.appdata',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/drive.photos.readonly'
    ],
    redirect: 'http://localhost/oauth' // delete this object if you want to get token only after login or authorize
})

const url = gd.authUrl()

console.log(url)
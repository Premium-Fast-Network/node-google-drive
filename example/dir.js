const GoogleDrive = require('../src/googledrive');
const credentials = require('./credentials');

const gd = new GoogleDrive({
    clientId: credentials.clientId,
    clientSecret: credentials.clientSecret,
    scopes: credentials.scopes,
});

// set user token
const setToken = gd.setToken(credentials.user);

// create new folders
// id folder parents inside array
// gd.createDir('NAME-FOLDER', ['FOLDER-ID-PARENTS'])

// delete a folder
// can use function deleteFiles
gd.deleteFiles('FOLDER-ID')
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });

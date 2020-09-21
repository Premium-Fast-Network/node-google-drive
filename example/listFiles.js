const GoogleDrive = require('../src/googledrive');
const credentials = require('./credentials');

const gd = new GoogleDrive({
    clientId: credentials.clientId,
    clientSecret: credentials.clientSecret,
    scopes: credentials.scopes,
});

// set user token
const setToken = gd.setToken(credentials.user);

// if you want custom query, just put object in function
// example : https://developers.google.com/drive/api/v3/reference/files/list

// with query
// gd.listFiles(query)

// without query
gd.listFiles()
    .then((res) => {
        return res.data;
    })
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });

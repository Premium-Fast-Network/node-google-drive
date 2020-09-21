const GoogleDrive = require('../src/googledrive');
const credentials = require('./credentials');

const gd = new GoogleDrive({
    clientId: credentials.clientId,
    clientSecret: credentials.clientSecret,
    scopes: credentials.scopes,
});

// set user token
const setToken = gd.setToken(credentials.user);

// refresh token manual
const refresh = gd.refreshToken();

refresh
    .then((res) => {
        // your function for save new token to database

        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });

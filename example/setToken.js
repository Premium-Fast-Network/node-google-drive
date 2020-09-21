const GoogleDrive = require('../src/googledrive');
const credentials = require('./credentials');

const gd = new GoogleDrive({
    clientId: credentials.clientId,
    clientSecret: credentials.clientSecret,
    scopes: credentials.scopes,
});

// set user token
const setToken = gd.setToken(credentials.user);
console.log('set user token');
console.log(setToken);

// get user token
const getToken = gd.getToken();
console.log('get user token');
console.log(getToken);

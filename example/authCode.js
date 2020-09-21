const GoogleDrive = require('../src/googledrive');
const credentials = require('./credentials');

const gd = new GoogleDrive({
    clientId: credentials.clientId,
    clientSecret: credentials.clientSecret,
    scopes: credentials.scopes,
});

gd.verifyToken('AUTH-CODE-HERE')
    .then((res) => {
        console.log(res.tokens);
    })
    .catch((err) => {
        console.log(err);
    });

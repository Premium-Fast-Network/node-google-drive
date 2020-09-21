const GoogleDrive = require('../src/googledrive');
const credentials = require('./credentials');
const fs = require('fs');
const byteHuman = require('pretty-bytes');

const gd = new GoogleDrive({
    clientId: credentials.clientId,
    clientSecret: credentials.clientSecret,
    scopes: credentials.scopes,
});

// set user token
const setToken = gd.setToken(credentials.user);

// download file with progress
gd.downloadFile('GOOGLE-DRIVE-FILES-ID')
    .then((res) => {
        return new Promise((resolve, reject) => {
            const name = 'file-name';
            const destination = fs.createWriteStream(name);
            let progress = 0;

            res.data
                .on('end', () => {
                    console.log('');
                    console.log('Done downloading file.');
                    resolve(name);
                })
                .on('error', (err) => {
                    console.error('Error downloading file.');
                    reject(err);
                })
                .on('data', (d) => {
                    progress += d.length;
                    if (process.stdout.isTTY) {
                        process.stdout.clearLine();
                        process.stdout.cursorTo(0);
                        process.stdout.write(
                            'Downloaded ' + byteHuman(progress),
                        );
                    }
                })
                .pipe(destination);
        });
    })
    .catch((err) => {
        console.log(err);
    });

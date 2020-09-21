const credentials = {
    clientId: 'YOUR-API-CLIENT-ID',
    clientSecret: 'YOUR-API-CLIENT-SECRET',
    scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
    ],
    user: {
        access_token: '',
        refresh_token: '',
        id_token: '',
        expiry_date: '',
        token_type: '',
    },
};

module.exports = credentials;

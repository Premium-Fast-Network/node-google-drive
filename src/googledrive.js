const axios = require('axios')
const { google } = require('googleapis')

class GoogleDrive {
    constructor({
        clientId,
        clientSecret,
        scopes,
        redirect
    }) {
        this.clientId = clientId
        this.clientSecret = clientSecret
        this.scopes = scopes
        this.redirect = redirect ? redirect : 'urn:ietf:wg:oauth:2.0:oob'

        // inject google oauth to constructor
        this.oauth2Client = new google.auth.OAuth2(
            this.clientId,
            this.clientSecret,
            this.redirect
        )
    }

    // function generate oauth url with refresh_token
    authUrl() {
        return this.oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: this.scopes
        })
    }

    // function verify token from oauth url
    verifyToken(code) {
        const { tokens } = this.oauth2Client.getToken(code)

        return tokens
    }
}

module.exports = GoogleDrive
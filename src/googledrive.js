const axios = require('axios')
const { google } = require('googleapis')
const apiUrl = require('./url')

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

        // inject default url api list
        this.gdApiUrl = apiUrl
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
        return new Promise((resolve, reject) => {
            const token = this.oauth2Client.getToken(code)

            if(token) {
                resolve(token)
            } else {
                reject('failed to validate token')
            }
        })
    }


    // function set user token
    setToken({
        access_token,
        refresh_token,
        expiry_date
    }) {
        this._accessToken    = access_token
        this._refreshToken   = refresh_token
        this._expiryDate     = expiry_date

        return this.getToken()
    }

    // function get user token
    getToken() {
        const dataToken = {
            access_token: this._accessToken,
            refresh_token: this._refreshToken,
            expiry_date: this._expiryDate
        }

        return dataToken
    }

    // function manually refresh token
    refreshToken() {
        return axios.post(this.gdApiUrl.refreshToken, {
            client_id: this.clientId,
            client_secret: this.clientSecret,
            refresh_token: this._refreshToken,
            grant_type: 'refresh_token'
        })
    }
}

module.exports = GoogleDrive
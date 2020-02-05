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

            if (token) {
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
        id_token,
        expiry_date,
        token_type
    }) {
        this._accessToken = access_token ? access_token : null
        this._refreshToken = refresh_token ? refresh_token : null
        this._idToken = id_token ? id_token : null
        this._expiryDate = expiry_date ? expiry_date : null
        this._tokenType = token_type ? token_type : null

        this.oauth2Client.setCredentials(this.getToken())

        this.drive = google.drive({
            version: "v3",
            auth: this.oauth2Client
        })

        return this.getToken()
    }

    // function get user token
    getToken() {
        const dataToken = {}
        dataToken.access_token = this._accessToken
        dataToken.refresh_token = this._refreshToken
        dataToken.id_token = this._idToken
        dataToken.expiry_date = this._expiryDate
        dataToken.token_type = this._tokenType

        return dataToken
    }

    // function manually refresh token using axios
    // refreshToken() {
    //     return axios.post(this.gdApiUrl.refreshToken, {
    //         client_id: this.clientId,
    //         client_secret: this.clientSecret,
    //         refresh_token: this._refreshToken,
    //         grant_type: 'refresh_token'
    //     })
    // }

    // function refresh token from google oauth2Client
    refreshToken() {
        return this.oauth2Client.refreshAccessToken();
    }

    // function get live token now from google oauth2Client
    getAccessToken() {
        return this.oauth2Client.getAccessToken();
    }

    // function check user Quota
    checkQuota() {
        const queryEncode = encodeURIComponent('kind,storageQuota,user,maxUploadSize,maxImportSizes')

        const buildUrl = this.gdApiUrl.about + '?fields=' + queryEncode + '&access_token=' + this._accessToken

        return axios.get(buildUrl)
    }

    // function lists files
    // docs: https://developers.google.com/drive/api/v3/reference/files/list
    listFiles(query) {
        let params = {
            pageSize: 1000,
        }

        if (query) {
            params = query
        }

        return this.drive.files.list(params)
    }

    // function get files by id
    // docs: https://developers.google.com/drive/api/v3/reference/files/get
    getFiles(id) {
        return this.drive.files.get({ fileId: id })
    }

    // function delete files by id
    // docs: https://developers.google.com/drive/api/v3/reference/files/delete
    deleteFiles(id) {
        return this.drive.files.delete({ fileId: id })
    }

    // function copy files by id
    // docs: https://developers.google.com/drive/api/v3/reference/files/copy
    copyFiles(query) {
        return this.drive.files.copy(query)
    }

    // function empty trash
    // docs: https://developers.google.com/drive/api/v3/reference/files/emptyTrash
    emptyTrash() {
        return this.drive.files.emptyTrash()
    }

    // function share file private by email
    // docs: https://developers.google.com/drive/api/v3/reference/permissions/create
    shareToEmail(id, email) {
        return this.drive.permissions.create({
            fileId: id,
            sendNotificationEmail: true,
            requestBody: {
                emailAddress: email,
                role: 'reader',
                type: 'user'
            }
        })
    }

    // function share file to public
    // docs: https://developers.google.com/drive/api/v3/reference/permissions/create
    shareToPublic(id) {
        return this.drive.permissions.create({
            fileId: id,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        })
    }

    // function create new folder
    createDir(name, parents) {
        return this.drive.files.create({
            requestBody: {
                mimeType: 'application/vnd.google-apps.folder',
                name: name,
                parents: parents ? parents : null
            }
        })
    }
}

module.exports = GoogleDrive
# Google Drive (NodeJS)

![npm](https://img.shields.io/npm/v/@premiumfastnet/google-drive) ![npm](https://img.shields.io/npm/dm/@premiumfastnet/google-drive) ![GitHub Release Date](https://img.shields.io/github/release-date/Premium-Fast-Network/node-google-drive) ![GitHub issues](https://img.shields.io/github/issues-raw/Premium-Fast-Network/node-google-drive) ![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/Premium-Fast-Network/node-google-drive) ![NPM](https://img.shields.io/npm/l/@premiumfastnet/google-drive)

Simple Interaction to Google Drive using NodeJS + Promises

## Important

-   _This script make without guarantee._
-   _If you found error or something else, please make a new issue or pull request._

# Documentation

## Installation

-   NPM

```bash
npm i @premiumfastnet/google-drive
```

-   Yarn

```bash
yarn add @premiumfastnet/google-drive
```

## Feature and Example Code

-   [Setup Credentials API](example/credentials.sample.js) (Rename `credentials.sample.js` to `credentials.js`)
-   [Generate Auth Url](example/authUrl.js)
-   [Validate Auth Code](example/authUrl.js)
-   [Set and Get Token (User)](example/setToken.js)
-   [Refresh Token Manually (User)](example/setToken.js)
-   [Check Quota (User)](example/checkQuota.js)
-   [List Files (User)](example/listFiles.js)
-   [Get, Copy, Delete Files and Empty Trash (User)](example/files.js)
-   [Share Files to Email (Private) or Public](example/share.js)
-   [Create and Delete Directory](example/dir.js)
-   [Upload Single File With Progress Progress Bar](example/uploadFile.js)
-   [Download Files With Progress](example/downloadFile.js)

## To-DO

-   [x] Get Detail Disk Quota
-   [x] Get List Files
-   [x] Get, Copy, Delete Files
-   [x] Empty Trash
-   [x] Share Files to Email (Private) or Public
-   [x] Create and Delete Directory
-   [x] Upload Single File With Progress Bar
-   [x] Download Files With Progress

## Best Practise How to Use Nested Function

-   This example will explain how to generate a new token and continue to next request function
-   We can define multiple function in one way.
-   In first time we set a user token, then we make a function for check quota, then all of this will execute after we refresh a token manually.

```javascript
const gd = new GoogleDrive({
    clientId: credentials.clientId,
    clientSecret: credentials.clientSecret,
    scopes: credentials.scopes,
});

// set user token
const setToken = gd.setToken(credentials.user);

// check quota
const quota = () => {
    gd.checkQuota()
        .then((res) => {
            // your function for save new quota to database
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
};

// refresh token manual
const refresh = gd.refreshToken();

refresh
    .then((res) => {
        gd.setToken(res.data);
    })
    .then(() => {
        quota();
    })
    .catch((err) => {
        console.log(err);
    });
```

## INFO

-   By: Juni Yadi @ Premium Fast Network
-   License: MIT

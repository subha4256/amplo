const config = require("../config");
var redirectUrl =config.ApiBaseUrl;
export const msGraphConfig = {
    clientId: '56dfe4ea-3d7f-49ff-9cf4-3f213bbfbeae',
    authority:"https://login.microsoftonline.com/a5807368-4c35-4f5b-a0ff-e60aea95338f",
    redirectUri: redirectUrl.replace('/public/', ''),
    scopes: [
        'user.read'
    ]
};
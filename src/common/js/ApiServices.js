import $ from 'jquery';
import {responseMessage} from '../../utils/alert';
import CacheStorage from '../../utils/CacheStorage';
const globalConfig = require('../../config');

class ApiServer {
    constructor(useLaravel=false) {
        this.authToken = '';
        this.baseUrl=true;
        this.useLaravel=useLaravel;
        if(useLaravel){
            this.baseUrl=globalConfig.laravelBaseUrl.slice(0,-1);
        }
        else{
            this.baseUrl=globalConfig.ApiBaseUrl;
        }
    }
    SendRequest(config) {
        let requestObject = {
            url: this.baseUrl + config.url,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer '+ CacheStorage.getItem('userToken'));
            },
            type: config.method,
            data: config.data,            
        };
        if (config.hasOwnProperty('authToken') && config.authToken !== '') {
            this.authToken = config.authToken;
        }
        if (config.hasOwnProperty('contentType')) {
            requestObject.contentType = config.contentType;
        }
        if (config.hasOwnProperty('dataType')) {
            config.dataType = config.dataType;
        }
        if (config.hasOwnProperty('headers')) {
            requestObject.headers = config.headers;
        }



        return new Promise((Resolve, Reject) => {
            $.ajax(requestObject)
                .then(result => {
                    // if (
                    //     result.hasOwnProperty('message') &&
                    //     result.message === 'Authorization Failed'
                    // ) {
                    //     this.renderRedirectElement();
                    // } else {
                    //     Resolve(JSON.parse(result));
                    // }
                    //console.log(result);
                    if(this.useLaravel)
                    {
                        Resolve(result);

                    }
                    else{
                        Resolve(JSON.parse(result));

                    }
                })
                .catch(error => {
                    if(error.status==401){
                        window.location.href="/";
                        CacheStorage.removeItem('userToken');
                        CacheStorage.removeItem('userType');
                    }
                    else if(error.status==500){
                        responseMessage("error", "Something went wrong please try again", "");
                    }
                    console.log("main log error",error);

                    Reject(error.responseJSON)
                });
        });
    }



}
export default ApiServer;
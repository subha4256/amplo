import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import CacheStorage from '../../utils/CacheStorage';
import CryptoJS from 'crypto-js';

const PrivateRoute = ({component: Component, ...rest}) => {
    const CryptoJSAesJson = {
        stringify: function (cipherParams) {
            var j = {ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)};
            if (cipherParams.iv) j.iv = cipherParams.iv.toString();
            if (cipherParams.salt) j.s = cipherParams.salt.toString();
            return JSON.stringify(j);
        },
        parse: function (jsonStr) {
            var j = JSON.parse(jsonStr);
            var cipherParams = CryptoJS.lib.CipherParams.create({ciphertext: CryptoJS.enc.Base64.parse(j.ct)});
            if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv)
            if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s)
            return cipherParams;
        }
    }
    const decrypted = (CacheStorage.getItem('encryptedAccess') != null && CacheStorage.getItem('encryptedAccess') != "") ? JSON.parse(CryptoJS.AES.decrypt(CacheStorage.getItem('encryptedAccess'), "modulePhrase", {format: CryptoJSAesJson}).toString(CryptoJS.enc.Utf8)) : [];
    const accessibleModules = typeof decrypted == "string" ? JSON.parse(decrypted).map(mod=>mod.ModuleName ? mod.ModuleName.toLowerCase() : "") : [];
    const {role, module, path} = rest;
    return(
        <Route
            {...rest}        render={ props => CacheStorage.getItem('userToken') ?
                (
                    (role === 'admin' && (CacheStorage.getItem('userType') == "3" || CacheStorage.getItem('userType') == "4" || CacheStorage.getItem('userType') == "5")) 
                    || 
                    (role === 'normaluser' && (CacheStorage.getItem('userType') == "1" || CacheStorage.getItem('userType') == "2"))
                    || 
                    (role === 'superuser' && CacheStorage.getItem('userType') == "1")
                    ||
                    ((CacheStorage.getItem('userType') == "1" || (CacheStorage.getItem('userType') == "3" || CacheStorage.getItem('userType') == "4" || CacheStorage.getItem('userType') == "5")) && path == "/manage-team")
                ) 
                ? 
                    CacheStorage.getItem('userType') == "1" 
                    || 
                    CacheStorage.getItem('userType') == "2" 
                    ? 
                    module != "All"
                    ?
                    accessibleModules.includes(module.toLowerCase())
                    ?
                    <Component {...props} /> 
                    :
                    <Redirect to="/dashboard" /> 
                    :
                    <Component {...props} /> 
                    :
                    <Component {...props} /> 
                : 
                    CacheStorage.getItem('userType') == "1" 
                    || 
                    CacheStorage.getItem('userType') == "2" 
                    ? 
                    <Redirect to="/dashboard" /> 
                    : 
                    <Redirect to="/admin-dashboard" /> 
                : 
                <Redirect to="/login" />
                // let restProps = {...rest};
                // let userType = "2";
                // if(restProps.access === 'admin') {
                //     userType = "1";
                // }
            }
        />
    )
}

export default PrivateRoute;
import {Global} from './Env';
const config = require('../config');

//.. creating a custom cache to save data
export default class CacheStorage {

    static getStorage(){
        return (typeof(Storage) !== "undefined") ? Global[config.cacheType]: Global;
    }
    
    static getItem(key){
        return CacheStorage.getStorage().getItem(key);
    }

    static setItem(key, value) {
        CacheStorage.getStorage().setItem(key, value);
    }

    static removeItem(key) {
        CacheStorage.getStorage().removeItem(key);
    }

    static clearAll() {
        CacheStorage.getStorage().clear();
    }

}



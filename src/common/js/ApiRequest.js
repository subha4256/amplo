import axios from 'axios';

export const getSignIn = async(token)=>{
    axios.interceptors.request.use(function (config) {
        
        config.headers.Authorization = "Bearer "+ token;
    
        return config;
    });
try {
   
    let result = await axios.post("https://api.powerbi.com/v1.0/myorg/groups/d293733f-97a8-48ad-b2dc-280ac14c2e0d/reports/3ad145a7-69ae-4a44-8018-2562d9d25189/generatetoken");
    return result
} catch (error) {
    return error
}
}
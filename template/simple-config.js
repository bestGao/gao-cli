const generateAPI = require('@gao/generate-api').default

/* 
*  0 全部生成  
*  1 生成 apis
*  2 生成 types
*/
const type = process.env.GENERATE_TYPE

const options = {
    APIGROUP: [
        '5c187f0ae8b80032a7640645', // 油品
        'ds'
    ],
    needApis: /0|1/.test(type),
    needType: /0|2/.test(type)
}

generateAPI(options)
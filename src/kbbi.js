const JcAPI = require('jastinch-api-wrapper')

const cari = async(keyword) => {
    if(!keyword) throw new Error('Provide the keyword/kata kunci!')
    const data = await JcAPI.KBBI(keyword)
    return data;
}
module.exports = cari;
// find some more useful functions at jastinch-api-wrapper! you can check at https://npmjs.com/package/jastinch-api-wrapper
// lol 10 lines xD
const JcAPI = require('jastinch-api-wrapper')
const axios = require('axios')
const userAgents = require('./tools/user-agents.js')
const cari = async(keyword) => {
    if(!keyword) throw new Error('Provide the keyword/kata kunci!')
    const get = await axios(`https://kbbi-api-zhirrr.vercel.app/api/kbbi?text=${keyword}`, {
    headers: {
        "User-Agent": userAgents[Math.floor(Math.random() * userAgents.length)]
    }
    })
    const res = get.data
    return res
}
module.exports = cari;

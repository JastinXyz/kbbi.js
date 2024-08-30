const axios = require('axios');
const { parse } = require('node-html-parser');

async function cari(keyword) {
    if(!keyword) throw new Error('Provide the keyword/kata kunci!')
    const get = await axios(`https://kbbi.kemdikbud.go.id/entri/${keyword}`);
    const res = get.data;

    const root = parse(res);
    const lema = root.querySelector('h2').text;
    let arti = root.querySelectorAll('ol li').map(x => x.text.slice(1).split("  ").join(""));
    if (arti.length === 0) {
        const artiAlt = root.querySelectorAll('ul.adjusted-par').map(x => x.text.slice(1).split("  ").join(""));
        arti = artiAlt;
    }
    
    if (arti.length === 0) {
        return { lema: null, arti: null};
    }
    
    return { lema, arti };
}

module.exports = cari;
const axios = require('axios');
const { parse } = require('node-html-parser');

async function cari(keyword) {
    if(!keyword) throw new Error('Provide the keyword/kata kunci!');

    const get = await axios(`https://kbbi.web.id/${keyword}`);
    const res = get.data;

    const document = parse(res);
    const jsonData = document.querySelector('textarea#jsdata').textContent;
    
    if(!jsonData.length) return { lema: null, arti: null }

    const data = JSON.parse(jsonData).filter((d) => d.x == 1);

    const extractSupNumber = (item) => {
        const supMatch = item.w.match(/<sup>(.*?)<\/sup>/);
        if (supMatch) return parseInt(supMatch[1]);
        return 0;
    };

    data.sort((a, b) => extractSupNumber(a) - extractSupNumber(b));

    let lema, arti;
    data.forEach((item, index) => {
        const text = item.d.replace(/&#183;/g, '.').split('<br/>').filter((x) => x.length);
        text.forEach((t, i) => {
            const bold = t.match(/<b>(.*?)<\/b>/g);
            if (bold) {
                if (bold[0]) {
                    const mainHighlight = bold[0].replace(/<sup>(.*?)<\/sup>/g, '').replace(/<b>|<\/b>/g, '');
                    if (!index && !i) {
                        lema = mainHighlight;

                        let allArti = t.replace(bold[0], '').replace(/<em>(n|v|a)<\/em>/g, '').trim();
                        arti = allArti.split(/<b>(.*?)<\/b>/g).filter((_, index) => index % 2 === 0).map((definisi) => definisi.replace(/<em>(.*?)<\/em>/g, '$1').replace(/<b>(.*?)<\/b>/g, '$1').trim()).filter((definisi) => definisi.length);
                    }
                }
            }
        });
    });
    
    return { lema, arti };
}

module.exports = { cari };
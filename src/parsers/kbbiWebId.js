const { parse } = require('node-html-parser');
const { normalizeText } = require('../utils/normalizeText');

const parseKbbiWebId = (html) => {
    const document = parse(html);
    const jsonData = document.querySelector('textarea#jsdata')?.textContent || '';

    if (!jsonData.length) return { lema: null, arti: null };

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
            if (bold && bold[0]) {
                const mainHighlight = bold[0].replace(/<sup>(.*?)<\/sup>/g, '').replace(/<b>|<\/b>/g, '');
                if (!index && !i) {
                    lema = normalizeText(mainHighlight);

                    let allArti = t.replace(bold[0], '').replace(/<em>(n|v|a)<\/em>/g, '').trim();
                    arti = allArti
                        .split(/<b>(.*?)<\/b>/g)
                        .filter((_, index) => index % 2 === 0)
                        .map((definisi) => normalizeText(definisi.replace(/<em>(.*?)<\/em>/g, '$1').replace(/<b>(.*?)<\/b>/g, '$1')))
                        .filter((definisi) => definisi.length);
                }
            }
        });
    });

    return { lema, arti };
};

module.exports = { parseKbbiWebId };

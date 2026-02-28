const axios = require('axios');
const { SOURCE_MAP } = require('./sources');

async function cari(keyword, options = {}) {
    if (!keyword) throw new Error('Provide the keyword/kata kunci!');

    const order = Array.isArray(options.sources) && options.sources.length
        ? options.sources
        : ['kbbi.kemendikdasmen.go.id', 'kbbi.web.id', 'typoonline.com', 'kbbi.co.id'];

    for (const source of order) {
        const handler = SOURCE_MAP[source];
        if (!handler) continue;
        try {
            const get = await axios(handler.buildUrl(keyword), handler.requestConfig);
            const parsed = handler.parse(get.data);
            if (parsed?.lema || (parsed?.arti && parsed.arti.length)) return parsed;
        } catch (error) {
            continue;
        }
    }

    return { lema: null, arti: null };
}

module.exports = { cari };

const { parseKbbiWebId } = require('./parsers/kbbiWebId');
const { parseKbbiCoId } = require('./parsers/kbbiCoId');
const { parseTypoOnline } = require('./parsers/typoOnline');
const { parseKbbiKemendikdasmen } = require('./parsers/kbbiKemendikdasmen');

const SOURCE_MAP = {
    'kbbi.kemendikdasmen.go.id': {
        buildUrl: (keyword) => `https://kbbi.kemendikdasmen.go.id/entri/${encodeURIComponent(keyword)}`,
        parse: parseKbbiKemendikdasmen,
    },
    'kbbi.web.id': {
        buildUrl: (keyword) => `https://kbbi.web.id/${encodeURIComponent(keyword)}`,
        parse: parseKbbiWebId,
    },
    'typoonline.com': {
        buildUrl: (keyword) => `https://typoonline.com/kbbi/${encodeURIComponent(keyword)}`,
        parse: parseTypoOnline,
        requestConfig: {
            headers: {
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'accept-language': 'id-ID,id;q=0.9,en;q=0.8',
            },
        },
    },
    'kbbi.co.id': {
        buildUrl: (keyword) => `https://kbbi.co.id/arti-kata/${encodeURIComponent(keyword)}`,
        parse: parseKbbiCoId,
    },
};

module.exports = { SOURCE_MAP };

const { parse } = require('node-html-parser');
const { normalizeText } = require('../utils/normalizeText');

const parseKbbiKemendikdasmen = (html) => {
    const document = parse(html);
    const head = document.querySelector('.body-content h2');
    const list = document.querySelector('.body-content ol');

    if (!head || !list) return { lema: null, arti: null };

    const lema = normalizeText(head.textContent);
    const arti = list.querySelectorAll('li')
        .map((item) => normalizeText(item.textContent))
        .filter((definisi) => definisi.length);

    return { lema: lema || null, arti: arti.length ? arti : null };
};

module.exports = { parseKbbiKemendikdasmen };

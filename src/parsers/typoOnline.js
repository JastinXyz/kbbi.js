const { parse } = require('node-html-parser');
const { normalizeText } = require('../utils/normalizeText');

const parseTypoOnline = (html) => {
    const document = parse(html);
    const container = document.querySelector('#textres');
    const meta = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    const metaNormalized = meta ? normalizeText(meta) : '';

    const parseMeta = () => {
        if (!metaNormalized) return { lema: null, arti: null };
        const match = metaNormalized.match(/Definisi\/Arti kata\s+(.+?)\s+di\s+Kamus Besar Bahasa Indonesia.*?adalah\s+(.*)$/i);
        if (!match) return { lema: null, arti: null };
        const lema = normalizeText(match[1]);
        const arti = normalizeText(match[2]);
        return { lema, arti: arti ? [arti] : null };
    };

    if (!container) return parseMeta();

    const key = container.querySelector('b.key');
    const headWord = container.querySelector('.head-kata b');
    const rawLemma = key?.textContent || headWord?.textContent || '';
    if (!rawLemma) return parseMeta();

    const lema = normalizeText(rawLemma).replace(/^\d+/, '').trim();

    let contentHtml = container.innerHTML.replace(/<span\s+class=['"]head-kata['"][\s\S]*?<\/span>/gi, '');
    contentHtml = contentHtml.split(/<br\s*\/?\s*>\s*<br\s*\/?\s*>/i)[0];

    const parts = contentHtml
        .replace(/<br\s*\/?\s*>/gi, '\n')
        .split('\n')
        .map((part) => part.trim())
        .filter(Boolean);

    const stopMarkers = [
        'Kata ',
        'Referensi dari KBBI',
        'Posisi kata ',
    ];

    const arti = [];
    for (const part of parts) {
        const text = normalizeText(parse(`<div>${part}</div>`).textContent);
        if (stopMarkers.some((marker) => text.startsWith(marker))) break;

        if (!arti.length) {
            const escaped = lema.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const withSlash = new RegExp(`^\\d*\\s*${escaped}\\s*(?:\/[^/]+\/)?\\s*`, 'i');
            const withoutSlash = new RegExp(`^\\d*\\s*${escaped}\\s*`, 'i');
            const cleaned = text.replace(withSlash, '').replace(withoutSlash, '').trim();
            if (cleaned) arti.push(cleaned);
            continue;
        }

        if (text.length) arti.push(text);
    }

    return { lema, arti: arti.length ? arti : null };
};

module.exports = { parseTypoOnline };

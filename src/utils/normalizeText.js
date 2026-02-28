const normalizeText = (text) => text.replace(/\u00b7/g, '.').replace(/&#183;/g, '.').replace(/\s+/g, ' ').trim();

module.exports = { normalizeText };

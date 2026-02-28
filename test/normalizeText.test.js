const test = require('node:test');
const assert = require('node:assert/strict');

const { normalizeText } = require('../src/utils/normalizeText');

test('normalizeText replaces middot and trims', () => {
    const input = '  ku\u00b7cing  ';
    assert.equal(normalizeText(input), 'ku.cing');
});

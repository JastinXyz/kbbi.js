const test = require('node:test');
const assert = require('node:assert/strict');

const { parseKbbiWebId } = require('../src/parsers/kbbiWebId');
const { parseKbbiCoId } = require('../src/parsers/kbbiCoId');
const { parseTypoOnline } = require('../src/parsers/typoOnline');
const { parseKbbiKemendikdasmen } = require('../src/parsers/kbbiKemendikdasmen');

test('parseKbbiWebId extracts lemma and meanings', () => {
    const json = JSON.stringify([
        { x: 1, w: '<b>kucing</b>', d: '<b>kucing</b> <em>n</em> hewan peliharaan<br/>' },
    ]);
    const html = `
        <textarea id="jsdata">${json.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</textarea>
    `;
    const result = parseKbbiWebId(html);
    assert.equal(result.lema, 'kucing');
    assert.deepEqual(result.arti, ['hewan peliharaan']);
});

test('parseKbbiCoId extracts lemma and meanings', () => {
    const html = `
        <div class="xwell">
            <h2 class="arti">kucing</h2>
            <div class="arti">
                <p><b>ku&middot;cing</b> <i>n</i> hewan peliharaan<br>binatang lucu</p>
            </div>
        </div>
    `;
    const result = parseKbbiCoId(html);
    assert.equal(result.lema, 'ku.cing');
    assert.deepEqual(result.arti, ['ku.cing n hewan peliharaan', 'binatang lucu']);
});

test('parseTypoOnline stops at double br and removes lemma', () => {
    const html = `
        <div id="textres">
            <span class='head-kata'><h2>Definisi atau arti kata <b>kucing</b> berdasarkan KBBI Online:</h2></span>
            <b><b class='key'>kucing</b></b> /<b>ku&middot;cing</b>/ <i>n</i> hewan peliharaan<br/>
            contoh pemakaian<br/><br/>
            Kata kucing digunakan dalam beberapa kalimat
        </div>
    `;
    const result = parseTypoOnline(html);
    assert.equal(result.lema, 'kucing');
    assert.deepEqual(result.arti, ['n hewan peliharaan', 'contoh pemakaian']);
});

test('parseKbbiKemendikdasmen extracts lemma and meanings', () => {
    const html = `
        <div class="body-content">
            <h2>ku.cing</h2>
            <ol>
                <li>mamalia kecil</li>
                <li>sebutan kiasan</li>
            </ol>
        </div>
    `;
    const result = parseKbbiKemendikdasmen(html);
    assert.equal(result.lema, 'ku.cing');
    assert.deepEqual(result.arti, ['mamalia kecil', 'sebutan kiasan']);
});

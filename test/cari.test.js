const test = require('node:test');
const assert = require('node:assert/strict');

const loadCariWithMock = (mockAxios) => {
    const axiosPath = require.resolve('axios');
    const original = require.cache[axiosPath];

    require.cache[axiosPath] = { exports: mockAxios };
    delete require.cache[require.resolve('../src/cari')];

    const { cari } = require('../src/cari');

    if (original) {
        require.cache[axiosPath] = original;
    } else {
        delete require.cache[axiosPath];
    }

    return cari;
};

test('cari falls back to next source when previous fails', async () => {
    const mockAxios = async (url) => {
        if (url.includes('kbbi.kemendikdasmen.go.id')) {
            throw new Error('fail');
        }
        if (url.includes('kbbi.web.id')) {
            throw new Error('fail');
        }
        if (url.includes('typoonline.com')) {
            return {
                data: `
                    <div id="textres">
                        <span class='head-kata'><h2>Definisi atau arti kata <b>kucing</b> berdasarkan KBBI Online:</h2></span>
                        <b><b class='key'>kucing</b></b> /<b>ku&middot;cing</b>/ <i>n</i> hewan peliharaan<br/>
                    </div>
                `,
            };
        }
        throw new Error('unexpected');
    };

    const cari = loadCariWithMock(mockAxios);
    const result = await cari('kucing');

    assert.equal(result.lema, 'kucing');
    assert.deepEqual(result.arti, ['n hewan peliharaan']);
});

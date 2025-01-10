const puppeteer = require('puppeteer');
const { parse } = require('node-html-parser');

async function cari(keyword) {
    if(!keyword) throw new Error('Please provide any keyword to find!');
    //to initiate puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`https://kbbi.kemdikbud.go.id/entri/${keyword}`);
    const res = await page.content()
    await browser.deleteCookie();
    const root = parse(res);
    const lema = root.querySelector('h2').text;
    let arti = root.querySelectorAll('ol li').map(x => x.text.slice(1).split("  ").join(""));
    if (arti.length === 0) {
        const artiAlt = root.querySelectorAll('ul.adjusted-par').map(x => x.text.slice(1).split("  ").join(""));
        arti = artiAlt;
    }
    
    if (arti.length === 0) {
        return { lema: null, arti: null};
    }
    await browser.close();
    return { lema, arti};
}

cari("neraka").then(result => console.log(result));

module.exports = { cari };
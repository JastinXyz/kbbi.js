# kbbi.js

Kamus Besar Bahasa Indonesia.

## Instalasi

```bash
npm install kbbi.js
# atau
yarn add kbbi.js
# atau
pnpm add kbbi.js
```

## Contoh Penggunaan
```js
const KBBI = require('kbbi.js')
KBBI.cari("pohon").then(console.log);
```

## Contoh Respon

- Jika arti berhasil ditemukan:
  ```json
  {
    "lema": "po.hon",
    "arti": [
      "tumbuhan yang berbatang keras dan besar; pokok kayu: -- asam; -- mangga;",
      "bagian yang permulaan atau yang dianggap dasar; pangkal;",
      "asal mula; pokok sebab; pulang -- , selamatan setahun (dua tahun dan sebagainya) sesudah orang meninggal;ada angin ada -- nya (hujan berpohon, panas berasal), pb segala hal ada asal mulanya (sebab-sebabnya);"
    ]
  }
  ```

- Jika tidak ditemukan arti:
  ```json
  { 
    "lema": null,
    "arti": null
  }
  ```
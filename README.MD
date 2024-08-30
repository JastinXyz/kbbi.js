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

# Contoh Penggunaan
```js
const KBBI = require('kbbi.js')
KBBI.cari("pohon").then(console.log);
```

## Contoh Respon

- Jika arti berhasil ditemukan:
  ```json
  {
    "lema": "po.hon1 ",
    "arti": [
      "tumbuhan atau tanaman berkayu menahun yang tegak dan tinggi, dengan ukuran dan tinggi tertentu, biasanya memiliki batang, cabang, dan daun yang tumbuh jauh dari permukaan tanah, seperti mangga dan kelapa: -- asam; -- mangga",
      "bagian yang permulaan atau yang dianggap dasar; pangkal",
      "asal mula; pokok sebab: pulang -- selamatan setahun (dua tahun dan sebagainya) sesudah orang meninggal",
      "Anatstruktur anatomis yang cabang-cabangnya menyerupai pohon"
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
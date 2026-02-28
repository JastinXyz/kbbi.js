# kbbi.js

Kamus Besar Bahasa Indonesia dengan fallback multi-sumber.

## Fitur
- Fallback otomatis dari beberapa sumber KBBI
- Urutan sumber bisa diatur lewat opsi
- Output konsisten: `{ lema, arti }`

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
const { cari } = require('kbbi.js')

cari('pohon').then(console.log);
```

## Opsi
```js
const { cari } = require('kbbi.js')

cari('pohon', {
  sources: [
    'kbbi.kemendikdasmen.go.id',
    'kbbi.web.id',
    'typoonline.com',
    'kbbi.co.id',
  ],
}).then(console.log);
```

## Daftar Sumber
- `kbbi.kemendikdasmen.go.id`
- `kbbi.web.id`
- `typoonline.com`
- `kbbi.co.id`

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

## Catatan
- Struktur HTML tiap sumber bisa berubah kapan saja.
- Jika satu sumber gagal, pencarian otomatis lanjut ke sumber berikutnya.

## Test
```bash
pnpm test
```

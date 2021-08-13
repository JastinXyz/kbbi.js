# kbbi.js

Kamus Besar Bahasa Indonesia.

# Installation
You can Install the package from [npmjs](https://npmjs.com/package/kbbi.js).<br>
Install the module with:
```cli
npm i kbbi.js
```

# Import the module
```js
const KBBI = require('kbbi.js')
```

# Example Setup
```js
const KBBI = require('kbbi.js') // import the module

KBBI.cari("pohon") // kata kunci = pohon
 .then(console.log) // respon berupa json dengan definisi pohon (kata kunci yang di cari tadi)

.catch(console.error) // jika eror, eror text akan ada di console
```

# Events
```js
KBBI.cari("kata kunci disini") 
```

# Contoh Respon JSON
```json
{"lema":"po.hon1 ","arti":["tumbuhan yang berbatang keras dan besar; pokok kayu: -- asam; -- mangga","bagian yang permulaan atau yang dianggap dasar; pangkal","asal mula; pokok sebab: pulang -- selamatan setahun (dua tahun dan sebagainya) sesudah orang meninggal"]}
```
#

# Links
- YouTube: https://youtube.com/c/JastinCh
- Github: https://github.com/JastinXyz
- Donate Me: https://api.jastinch.xyz/donate

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

async() => {
    const result = await KBBI.cari("pohon") // kata kunci = pohon

    console.log(result) // respon berupa json dengan definisi pohon (kata kunci yang di cari tadi)
}
```

# Events
```js
KBBI.cari("kata kunci disini") 
```

#

# Links
- YouTube: https://youtube.com/c/JastinCh
- My API Documentation: https://apiv2.jastinch.xyz
- More Useful NPM: https://npmjs.com/package/jastinch-api-wrapper
- Donate Me: https://apiv2.jastinch.xyz/donate
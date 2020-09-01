const fs = require('fs');
const path = require('path');

let dir = path.join(__dirname, 'icons');
const files = fs.readdirSync(dir);
let comps = files.map(f => {
    return read(dir, f);
}).join('\n');
let out = path.join(__dirname, 'dist', 'vue-icons.js');
fs.writeFileSync(out, makeFile(comps));


function read(dir, filename) {
    const text = fs.readFileSync(path.join(dir, filename), 'utf-8');
    return make(filename, text);
}
function make(fileName, text) {
    return `Vue.component('icon-${fileName.toLowerCase().replace(/\.svg/i, '')}',{template:\`${text.trim()}\`});`.replace(/\\n/, '');
}
function makeFile(comps) {
    return `export function install(Vue) {
        ${comps}
    }`;
}
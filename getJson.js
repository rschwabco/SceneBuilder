const fetch = require('node-fetch');
const fs = require("fs")

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json => fs.writeFileSync("posts-1.json", JSON.stringify(json)))
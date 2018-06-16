var crypto = window.crypto || window.msCrypto;

var conf = {
    keyword: 'ourmotherfuckingsecretcode',
    eventname: 'tallinn20180611',
    tickets: 6,
}

async function start() {
    var generatedHashes = []
    for (var i = 0; i < conf.tickets; i++) {
        var code = conf.keyword + conf.eventname + i
        var hash = await getHash(code)
        generatedHashes.push(hash)
    }

    generatedHashes.forEach(hash => {
        document.querySelector('ul').innerHTML += `<p>${hash}</p>`
    })
}

async function getHash(value, algorithm = 'SHA-1') {
    let msgBuffer = new TextEncoder('utf-8').encode(value);
    let hashBuffer = await crypto.subtle.digest(algorithm, msgBuffer);
    let hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
}

start()
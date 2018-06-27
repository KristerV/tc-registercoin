var crypto = window.crypto || window.msCrypto;

try {
    Function("() => {};")
}
catch (e) {
    updateStatus('Your browser is too old!')
}

var conf = {
    keyword: 'ourmotherfuckingsecretcode',
    eventname: 'tallinn20180611',
    tickets: 32,
    claimurl: 'https://fervent-panini-45fa4b.netlify.com?claim='
}

async function start() {
    updateStatus('Generating QR codes...')
    var generatedHashes = []
    const parentDiv = document.querySelector('#qrcodes')
    for (var i = 0; i < conf.tickets; i++) {
        updateCount(i)
        var code = conf.keyword + conf.eventname + i
        var hash = await getHash(code)
        generatedHashes.push(hash)

        const element = QRCode.generateSVG(conf.claimurl + hash, {
            fillcolor: "#fff",
            textcolor: "#000",
            margin: 4,
            modulesize: 8
        })
        parentDiv.appendChild(element)
        document.body.appendChild(parentDiv)
    }
    updateCount(conf.tickets)
    updateStatus('Done')

}

async function getHash(value, algorithm = 'SHA-1') {
    let msgBuffer = new TextEncoder('utf-8').encode(value);
    let hashBuffer = await crypto.subtle.digest(algorithm, msgBuffer);
    let hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
}

function updateStatus(msg, count) {
    document.querySelector('.qrstatus').innerHTML = msg
}

function updateCount(count) {
    document.querySelector('.qrcount').innerHTML = `(${count}/${conf.tickets})`
}

start()
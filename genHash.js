var crypto = window.crypto || window.msCrypto;

try {
    Function("() => {};")
}
catch (e) {
    updateStatus('Your browser is too old!')
}

var conf = {
    salt: 'ourmotherfuckingsecretcode',
    eventname: 'tallinn20180611',
    linksCount: 512,
    claimurl: 'https://fervent-panini-45fa4b.netlify.com?claim='
}

async function start() {
    updateStatus('Generating QR codes...')
    const parentDiv = document.querySelector('#qrcodes')
    for (var i = 0; i < conf.linksCount; i++) {
        updateCount(i)
        var code = conf.salt + conf.eventname + i
        var hash = await getHash(code)

        var qr = new VanillaQR({
            url: conf.claimurl + hash,
            size: 320,
            colorLight: "#fff",
            colorDark: "#000",
            noBorder: true, //Use a border or not
        });

        parentDiv.appendChild(qr.domElement)
    }
    updateCount(conf.linksCount)
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
    document.querySelector('.qrcount').innerHTML = `(${count}/${conf.linksCount})`
}

start()
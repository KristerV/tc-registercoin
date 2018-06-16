var paramsObj = getParams()

if (paramsObj.claim) {
    showSection('register')
}

function showSection(name) {
    document.querySelectorAll('section').forEach(function(item) {
        item.classList.add('hidden')
        if (item.classList.value.includes(name))
            item.classList.remove('hidden')
    })
}

function getParams() {
    var paramsArr = window.location.search.substr(1).split('&')
    var paramsObj = {}

    for (var i = 0; i < paramsArr.length; i++) {
        var p = paramsArr[i].split('=')
        paramsObj[p[0]] = p[1]
    }
    return paramsObj
}
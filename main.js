function geturl() {
    var url = document.getElementById("urlinput").value;
    return url
}

function send_request(url) {
    this.url = url;
    const options = { method: 'GET', headers: { accept: 'application/json' } };
    var responseText = document.getElementById('output');
    responseText.innerHTML = null
    fetch('https://api2.branch.io/v1/url?url=' + this.url + '&branch_key=key_live_abhHgIh1DQiuPxdBNg9EXepdDugwwkHr', options)
        .then(response => response.json())
        .then(response => responseText.innerHTML += response['data']['$desktop_url'] + '\r\n')
        .catch(err => console.error(err));
}

function shorturl() {
    var longurl = geturl();
    urlify(longurl);
}

function urlify(text) {
    var urlRegex = /(https:\/\/[a-zA-Z0-9&#=.\/\-?_]+)/g;
    return text.replace(urlRegex, function (url) {
        return send_request(url);
    })
}

const tx = document.getElementsByTagName("textarea");
for (let i = 0; i < tx.length; i++) {
    tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
    tx[i].addEventListener("input", OnInput, false);
    //tx[i].addEventListener("input", shorturl, false);
}

function OnInput() {
    this.style.height = 0;
    this.style.height = (this.scrollHeight) + "px";
}

var hashh = window.location.hash.substr(1)

if (window.location.hash != "") {
    $.getJSON(hashh, function (data) {
        data = data["result"];

        if (data != null) {
            window.location.href = data;
        }
    });
}
const Utils = {
    Network: {
        Get: (url, callback) => {
            fetch(url).then((response) => {
                return response.text()
            }).then((res) => {
                callback(res)
            })
        },
        GetJson: (url, callback) => {
            fetch(url).then((response) => {
                return response.json()
            }).then((res) => {
                callback(res)
            })
        },
        Post: function postData(url, data, callback) {
            // Default options are marked with *
            fetch(url, {
                    body: data, // must match 'Content-Type' header
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'same-origin', // include, same-origin, *omit
                    headers: {
                        'content-type': 'text/plain'
                    },
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    mode: 'cors', // no-cors, cors, *same-origin
                    redirect: 'follow', // manual, *follow, error
                    referrer: 'no-referrer', // *client, no-referrer
                })
                .then(response => response.json())
                .then((result) => callback(result))
        },
        PostJson: function postData(url, data, callback) {
            // Default options are marked with *
            fetch(url, {
                    body: JSON.stringify(data), // must match 'Content-Type' header
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'same-origin', // include, same-origin, *omit
                    headers: {
                        'content-type': 'application/json'
                    },
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    mode: 'cors', // no-cors, cors, *same-origin
                    redirect: 'follow', // manual, *follow, error
                    referrer: 'no-referrer', // *client, no-referrer
                })
                .then(response => response.json())
                .then((result) => callback(result))
        }
    },
    URL: {
        GetParam: function getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        }
    }
}

window.Utils = Utils
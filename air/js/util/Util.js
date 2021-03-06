var Util = {
    zeroize: function(n, t) {
        return (n = new String(n), n.length >= t) ? n : Util.zeroize("0" + n, t)
    },
    date: {
        format: function(n) {
            typeof n != "number" && (n = parseInt(n, 10));
            var t = new Date(n);
            return new String(t.getFullYear()) + "-" + Util.zeroize(t.getMonth() + 1, 2) + "-" + Util.zeroize(t.getDate(), 2)
        },
        formatFromYmd: function(n) {
            var t = n.split("-");
            return new String(t[0]) + "-" + Util.zeroize(t[1], 2) + "-" + Util.zeroize(t[2], 2)
        },
        formatToFull: function(n) {
            typeof n != "number" && (n = parseInt(n, 10));
            var t = new Date(n);
            return new String(t.getFullYear()) + "年" + new String(t.getMonth() + 1) + "月" + new String(t.getDate()) + "日"
        },
        formatToShort: function(n) {
            typeof n != "number" && (n = parseInt(n, 10));
            var t = new Date(n);
            return new String(t.getMonth() + 1) + "月" + new String(t.getDate()) + "日"
        },
        floor: function(n) {
            return arguments[0] === undefined && (n = Util.date.now()), Date.parse(Util.date.format(n))
        },
        parse: function(n) {
            return Date.parse(n)
        },
        now: function() {
            return (new Date).getTime()
        },
        formatTime: function(n) {
            var t = arguments[0] === undefined ? new Date : new Date(n);
            return Util.zeroize(t.getHours(), 2) + ":" + Util.zeroize(t.getMinutes(), 2)
        }
    },
    updateIcon: function() {},
    popup: function() {
        chrome.browserAction.executeAction({
            extensionId: config.appId
        })
    }
}

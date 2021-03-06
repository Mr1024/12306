function DateDifference(n) {
    return this.TicksCount = n, this.getSeconds = function() {
        return this.TicksCount / 1e3
    }, this.getMinutes = function() {
        return this.getSeconds() / 60
    }, this.getHours = function() {
        return this.getMinutes() / 60
    }, this.getDays = function() {
        return this.getHours() / 24
    }, this.getYears = function() {
        return this.getDays() / 365
    }, this
}
$.fn.extend({
    searchDelay: function(n) {
        var t = function(n, i) {
            var r = this;
            this.$element = n;
            this.timer = null;
            this.opt = $.extend(t.defaults, i);
            this.$element.keyup(function() {
                r.reset();
                r.timer = setTimeout(function() {
                    r.search.apply(r)
                }, r.opt.delay)
            })
        };
        return t.defaults = {
            delay: 300
        }, t.prototype.search = function() {
            this.$element.trigger("search.fish.searchdelay", this.$element.val())
        }, t.prototype.reset = function() {
            this.timer && clearTimeout(this.timer)
        }, t.prototype.cancel = function() {
            this.reset();
            this.$element.val("");
            this.search()
        }, this.each(function() {
            var u = "fish.searchdelay",
                r = $(this),
                i = r.data(u);
            i || (i = new t(r, n), r.data(u, i));
            typeof n == "string" && i[n].apply(i, $.makeArray(arguments).slice(1))
        }), this
    },
    nativeClick: function() {
        return this.each(function() {
            this.click && this.click()
        }), this
    }
});
var otsweb = function() {
    var n = function() {
        var n = this,
            t = "http://kyfw.12306.cn/otn/leftTicket/query",
            i = function(n) {
                var t = {},
                    o = n.indexOf("#") === -1 ? n : /getSelected\(['"](.*?)['"]\)/i.exec(n)[1].split("#")[11],
                    e = o.match(/([A-Z\d])0*?([\*\d]{5})0*?(\d{4})/gi);
                for (var s in e) {
                    var r = /([A-Z\d])0*?([\*\d]{5})0*?(\d{4})/i.exec(e[s]),
                        u = r[1],
                        f = r[2][0] == "*" ? null : parseInt(r[2], 10),
                        i = parseInt(r[3], 10);
                    i < 3e3 ? (t[u] = i, t["_" + u] = f, u == "7" ? (t.M = i, t._M = f) : u == "8" && (t.O = i, t._O = f)) : (t["0"] = i - 3e3, t._0 = f)
                }
                return t
            };
        return this.baseurl = "http://dynamic.12306.cn/otsweb/", this.getUrl = function(t) {
            return t ? t.indexOf("://") != -1 ? t : n.baseurl + t : null
        }, this.ajax = function(t, i, r, u, f, e, o) {
            i = n.getUrl(i);
            var s = {
                crossDomain: !1,
                data: u,
                dataType: f || "json",
                headers: {
                    "Fish-Referer": n.getUrl(r)
                },
                type: t || "GET",
                timeout: 1e4
            };
            return $.ajax(i, s).done(e).fail(o)
        }, this.ajaxGet = function(t, i, r, u, f, e) {
            return n.ajax("GET", t, i, r, u, f, e)
        }, this.ajaxPost = function(t, i, r, u, f, e) {
            return n.ajax("POST", t, i, r, u, f, e)
        }, this.queryTicket = function() {
            ISOTN ? n.queryTicketOtn.apply(this, $.makeArray(arguments)) : n.queryTicketDynamic.apply(this, $.makeArray(arguments))
        }, this.queryTicketOtn = function(r, u, f, e, o, s) {
            var h = {
                "leftTicketDTO.train_date": f,
                "leftTicketDTO.from_station": r,
                "leftTicketDTO.to_station": u,
                purpose_codes: o == "00" ? "ADULT" : o
            };
            n.ajaxGet(t, "http://kyfw.12306.cn/otn/leftTicket/init", h, "json", function(r) {
                if (!r) {
                    s(null);
                    return
                }
                if (r.c_url) {
                    t = "http://kyfw.12306.cn/otn/" + r.c_url;
                    n.queryTicketOtn.apply(n, [].slice.call(arguments));
                    return
                }
                if (!r.status) {
                    s(null);
                    return
                }
                var u = _.find(r.data, function(n) {
                    return n.queryLeftNewDTO.train_no == e
                });
                u && u.queryLeftNewDTO.canWebBuy === "Y" ? s(i(u.queryLeftNewDTO.yp_info)) : s(null)
            })
        }, this.queryTicketDynamic = function(t, r, u, f, e, o) {
            var s = {
                "orderRequest.train_date": u,
                "orderRequest.from_station_telecode": t,
                "orderRequest.to_station_telecode": r,
                "orderRequest.train_no": f,
                trainPassType: "QB",
                trainClass: "QB#D#Z#T#K#QT#",
                includeStudent: "00",
                seatTypeAndNum: "",
                "orderRequest.start_time_str": "00:00--24:00"
            };
            n.ajaxGet("order/querySingleAction.do?method=queryLeftTicket", "order/querySingleAction.do?method=init", s, "text", function(n) {
                if (n.indexOf("btn130_2") === -1) {
                    o(null);
                    return
                }
                o(i(n))
            })
        }, this
    };
    return new n
}();
Date.prototype.isValid = function() {
    return !isNaN(this.getFullYear())
};
Date.prototype.addDays = function(n) {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate() + n)
};
Date.prototype.addMonthes = function(n) {
    return new Date(this.getFullYear(), this.getMonth() + n, this.getDate())
};
Date.prototype.addYears = function(n) {
    return new Date(this.getFullYear() + n, this.getMonth(), this.getDate())
};
Date.prototype.subtract = function(n) {
    return n instanceof Date ? new DateDifference(this - n) : null
};
Date.prototype.format = function(n) {
    var t, i;
    n = n || "yyyy-MM-dd";
    t = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
    };
    /(y+)/i.test(n) && (n = n.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
    for (i in t) new RegExp("(" + i + ")").test(n) && (n = n.replace(RegExp.$1, RegExp.$1.length == 1 ? t[i] : ("00" + t[i]).substr(("" + t[i]).length)));
    return n
};
Date.prototype.trimToDay = function() {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate())
}

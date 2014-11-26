function compressFunc() {
    return !1
}

function unsafeInvoke(n) {
    if (isDebug) {
        var t = document.createElement("script");
        t.type = "text/javascript";
        t.textContent = buildCallback(n);
        document.head.appendChild(t)
    } else document.dispatchEvent(new CustomEvent(evtTag, {
        detail: buildCallback(n)
    }))
}

function buildCallback(n) {
    var i = "",
        t = "";
    return typeof n == "function" && (t = n.name), t || (t = Math.random() + ""), i += "(" + buildObjectJavascriptCode(n) + ")();" + (isDebug ? "\r\n//@ sourceURL=http://www.fishlee.net/soft/44/scripts/" + t + ".js" : ""), i.replace(/\$_\$/g, evtTag)
}

function buildObjectJavascriptCode(n) {
    var u, t, i, r, f;
    if (n === null) return "null";
    if (n === undefined) return "undefined";
    if (u = typeof n, u === "string") return '"' + n.replace(/(\r|\n|\\)/gi, function(n, t) {
        switch (t) {
            case "\r":
                return "\\r";
            case "\n":
                return "\\n";
            case "\\":
                return "\\\\"
        }
        return t
    }) + '"';
    if (u !== "object") return n + "";
    t = [];
    for (i in n) r = n[i], f = typeof r, f === "object" || f === "string" ? t.push(i + ":" + buildObjectJavascriptCode(r)) : t.push(i + ":" + r);
    return "{" + t.join(",") + "}"
}

function refreshSysConfig(n) {
    chrome.runtime.sendMessage({
        action: "getSysConfig"
    }, function(t) {
        sysConfig = t.detail;
        $doc.trigger("sysConfigUpdated");
        n()
    });
    msg.on("sysConfigUpdate", function() {
        sysConfig = this;
        $doc.trigger("sysConfigUpdated")
    })
}
var $doc = $(document),
    sysConfig, currentProfile, seatOrder = ["", "", "", "", "9", "P", "M", "O", "6", "4", "3", "2", "1", "0", "*"],
    isDebug = (compressFunc + "").indexOf("false") != -1,
    tagMap = {
        "动车或高铁或城铁": "[DGC].*",
        "特快或直达": "[TZ].*",
        "快车": "K.*",
        "高铁": "G.*",
        "动车": "D.*",
        "城铁": "C.*",
        "直达": "Z.*",
        "特快": "T.*",
        "任意车次": ".*"
    },
    passengerTypeCode = {
        "1": "成人",
        "2": "儿童",
        "3": "学生",
        "4": "残疾军人、伤残人民警察"
    },
    EVT_ONQUERYPAGE = "onQueryPage",
    EVT_ONLOGINPAGE = "onLoginPage",
    EVT_ONSUBMITPAGE = "onSubmitPage",
    EVT_ONMAINPAGE = "onMainPage",
    EVT_ONPASSENGERPAGE = "onPassengerPage",
    evtTag = (new Date).getTime(),
    toRawPassenger, evalCode;
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
};
$.fn.extend({
    nativeClick: function(n) {
        var t = this;
        return setTimeout(function() {
            t.each(function() {
                this.click && this.click()
            })
        }, n || 10), t
    },
    nativeFocus: function() {
        return this.each(function() {
            this.focus && this.focus()
        }), this
    },
    toBase64Data: function(n) {
        var t = function() {
            var e, r;
            $(this).unbind("load", t);
            var i = document.createElement("canvas"),
                u = this.naturalHeight,
                f = this.naturalWidth;
            i.width = f;
            i.height = u;
            e = i.getContext("2d");
            e.drawImage(this, 0, 0, f, u);
            r = i.toDataURL();
            delete i;
            r = r.substr(r.indexOf(",") + 1);
            n && n.call(this, r)
        };
        return this.each(function() {
            this.naturalHeight === 0 ? $(this).load(t) : t.call(this)
        }), this
    }
});
var msg = function() {
        var n = function() {
            var n = {},
                t = this;
            this.on = function(t, i) {
                var r = n[t] = n[t] || [];
                r.push(i)
            };
            this.off = function(t, i) {
                for (var u = n[t] = n[t] || [], r = u.length - 1; r >= 0; r++) u[r] === i && u.splice(r, 1)
            };
            chrome.runtime.onMessage.addListener(function(t, i, r) {
                if (!t.tag || t.tag !== evtTag) {
                    var f = t.action || "",
                        u = n[f];
                    u && $.each(u, function() {
                        return this.call(t.detail, r, t, i)
                    })
                }
            });
            this.send = function(n, t) {
                n = $.extend(n, {
                    tag: evtTag
                });
                chrome.runtime.sendMessage(null, n, t || function() {})
            };
            this.sendAction = function(n, i, r) {
                t.send({
                    action: n,
                    detail: i
                }, r)
            }
        };
        return new n
    }(),
    getTicketInfo = function(n) {
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
    },
    log = function() {
        var n = function() {
            return this.print = function() {
                isDebug && console.log.apply(console, $.makeArray(arguments))
            }, this
        };
        return new n
    }();
(function() {
    var n = document.createElement("script");
    n.id = "s_" + evtTag;
    n.textContent = "(" + (function() {
        document.addEventListener("$", function(n) {
            eval(n.detail)
        });
        var n = document.getElementById("s_$");
        document.head.removeChild(n)
    } + "").replace(/\$/g, evtTag) + ")();";
    document.head.appendChild(n)
})();
toRawPassenger = function(n) {
    return {
        passenger_name: n.name,
        passenger_type: n.type,
        passenger_id_type_code: n.idtype,
        passenger_id_no: n.id,
        passenger_first_letter: n.firstLetter,
        mobile_no: "",
        passenger_id_type_name: n.idtypeName,
        passenger_type_name: n.typename
    }
};
evalCode = function() {
        var n, t;
        return document.body.addEventListener(evtTag, function(t) {
            n = t && t.detail && t.detail.action == "dr" && t.detail.detail
        }), t = function() {
            this.eval = function(t) {
                return jQuery.isFunction(t) && (t = "(" + t + ")()"), document.dispatchEvent(new CustomEvent(evtTag, {
                    detail: {
                        action: "eval",
                        detail: {
                            code: t
                        }
                    }
                })), n
            }
        }, new t
    }(),
    function() {
        $.fn.extend({
            getTrimedText: function() {
                return $.trim(this.text())
            }
        })
    }();
$(function() {
    var n = null,
        t = null,
        i = !1,
        r = function() {
            chrome.runtime.sendMessage({
                action: "isReady"
            }, function() {
                n && clearInterval(n);
                t && clearInterval(t);
                i || (i = !0, $(document).trigger("routePage"))
            })
        },
        u = function() {
            n && clearInterval(n);
            t && clearInterval(t);
            chrome.runtime.sendMessage({
                action: "notLoadTip",
                detail: {
                    url: self.location + "",
                    host: self.location.host
                }
            })
        };
    log.print(evtTag);
    refreshSysConfig(function() {
        n = setInterval(r, 100);
        t = setTimeout(u, 15e3);
        r()
    });
    msg.send({
        action: "enter12306"
    })
});
$(document).on("filterTrains", function(n, t) {
    var i, r, u, e, f;
    currentProfile && (log.print("开始过滤车次"), currentProfile.hideNoTicket && (i = _.where(t.available, {
        available: 0
    }), $.each(i, function() {
        this.reason = 1;
        t.filtered.push(this);
        t.rowInfo && t.rowInfo[this.id].$row.remove();
        log.print("车次【" + this.code + "】因为无票被过滤。")
    }), t.available = _.difference(t.available, i)), currentProfile.hideNotSameFrom && (r = _.filter(t.available, function(n) {
        return n.from.code != currentProfile.fromCode
    }), $.each(r, function() {
        this.reason = 2;
        t.filtered.push(this);
        t.rowInfo && t.rowInfo[this.id].$row.remove();
        log.print("车次【" + this.code + "】因为发站不一致被过滤。")
    }), t.available = _.difference(t.available, r)), currentProfile.hideNotSameTo && (u = _.filter(t.available, function(n) {
        return n.to.code != currentProfile.toCode
    }), $.each(u, function() {
        this.reason = 3;
        t.filtered.push(this);
        t.rowInfo && t.rowInfo[this.id].$row.remove();
        log.print("车次【" + this.code + "】因为发站不一致被过滤。")
    }), t.available = _.difference(t.available, u)), function() {
        var n = _.filter(t.available, function(n) {
            var t = parseInt(/^0*(\d+)\:/i.exec(n.from.time)[1], 10),
                i = parseInt(/^0*(\d+)\:/i.exec(n.to.time)[1], 10);
            return t < currentProfile.timeRangeDepFrom || t > currentProfile.timeRangeDepTo || i < currentProfile.timeRangeArrFrom || i > currentProfile.timeRangeArrTo
        });
        $.each(n, function() {
            this.reason = 4;
            t.filtered.push(this);
            t.rowInfo && t.rowInfo[this.id].$row.remove();
            log.print("车次【" + this.code + "】因为时间不在指定的区域中而被过滤。")
        });
        t.available = _.difference(t.available, n)
    }(), currentProfile.selectedTrain && currentProfile.selectedTrain.length && (e = new RegExp("^(" + currentProfile.selectedTrain.join("|") + ")$", "i"), f = _.filter(t.available, function(n) {
        return !e.test(n.code)
    }), t.include = _.difference(t.available, f), currentProfile.hideNotInListTrain && ($.each(f, function() {
        this.reason = 5;
        t.filtered.push(this);
        t.rowInfo && t.rowInfo[this.id].$row.remove();
        log.print("车次【" + this.code + "】不在自动预定列表中而被过滤。")
    }), t.available = t.include)), log.print("车次过滤结束。"))
});
$(document).on("processTrains", function(n, t) {
    var u, h, c, f, e;
    if (currentProfile) {
        var o = Math.max(currentProfile.partialSubmitEnabled ? 0 : currentProfile.passengers.length, 1),
            r = null,
            s = null,
            i = null;
        t.original.length && !t.include.length && currentProfile.selectedTrain && currentProfile.selectedTrain.length && !currentProfile.byAuto && msg.sendAction("notify", {
            title: "提示",
            message: "貌似没有查到您要预定的任何车次，是否设置存在问题？",
            iconUrl: "/icons/icon_128.png"
        });
        u = _.map(currentProfile.selectedTrain, function(n) {
            return new RegExp("^" + n + "$", "i")
        });
        u && u.length || (u = [/.*/]);
        currentProfile.selectSeatFirst ? r = _.find(currentProfile.selectedSeatType, function(n) {
            var r = _.find(u, function(r) {
                return i = _.find(t.available, function(t) {
                    return r.test(t.code) && t.tickets[n] >= o
                }), typeof i != "undefined"
            });
            return typeof r != "undefined"
        }) : _.find(u, function(n) {
            return r = _.find(currentProfile.selectedSeatType, function(r) {
                return i = _.find(t.available, function(t) {
                    return n.test(t.code) && t.tickets[r] >= o
                }), typeof i != "undefined"
            }), typeof r != "undefined"
        });
        r ? (s = i.code, h = i.tickets[r], c = Math.min(h, currentProfile.passengers.length), t.auto = {
            train: s,
            seat: r,
            passengers: _.first(currentProfile.passengers, c),
            data: i
        }) : t.auto = null;
        t.allowAutoSubmit = !1;
        t.auto !== null ? (t.nextTime = null, currentProfile.autoSubmitEnabled && chrome.runtime.sendMessage({
            action: "checkAutoRefreshEnabled"
        }, function(n) {
            t.allowAutoSubmit = n.enabled;
            n.enabled && $(document).trigger("performAutoSubmit", t.auto)
        })) : (f = new Date, t.available.length && sysConfig.autoWaitToSell && currentProfile.autoWaitToSell && t.include.length && _.every(t.include, function(n) {
            return n.available === -1
        }) ? (e = _.min(_.map(t.include, function(n) {
            return n.selltime
        })), t.nextTime = f.getDate() === e.getDate() && e > f ? (e - f) / 1e3 + 15 : 5) : t.nextTime = f.getMinutes() >= 59 ? 61 - f.getSeconds() : 5);
        log.print("queryReport");
        ($("#autoSubmit:checked").length || !currentProfile.autoSubmitEnabled && $("#auto_query:checked").length) && (t.auto = null);
        chrome.runtime.sendMessage({
            action: "queryStatisticsReport",
            detail: {
                stat: _.omit(t, "rowInfo"),
                auto: t.auto,
                nextTime: t.nextTime
            }
        })
    }
});
(function() {
    $(document).bind("qe", function() {
        if ($("#auto_query:checked").length) {
            var n = $("#query_ticket").data("suspend", !0)[0];
            n && n.click()
        }
        chrome.runtime.sendMessage({
            action: "queryStatisticsReport",
            detail: {
                failed: !0,
                nextTime: 5
            }
        })
    })
})();
$(document).on("routePage", function() {
    var t = 0,
        i = !1,
        n = !1;
    $(document).on("randCodeLoaded", function(r, u) {
        var f = (new Date).getMinutes(),
            e, o;
        if ((!(f >= 59) || !(f <= 5)) && (!(f >= 28) || !(f <= 35)) && sysConfig && sysConfig.enableAutoCaptcha) {
            if (t >= sysConfig.autoCaptchaFailedLimit) {
                t = 0;
                i = !1;
                return
            }
            if (i || (i = !0), n) {
                n = !1;
                return
            }
            e = $("#" + u);
            o = /rand=([a-z]+)/.exec(e.attr("src")) && RegExp.$1;
            e.toBase64Data(function(i) {
                chrome.runtime.sendMessage({
                    action: "captcha",
                    detail: {
                        base64: i
                    }
                }, function(i) {
                    if (n) {
                        n = !1;
                        t = 0;
                        return
                    }
                    var r = i.code;
                    r && r.length == 4 && e.parent().prev("input").val(r)
                })
            })
        }
    });
    $(document).on("click", "#randCode, #randCode2", function() {
        n = !0
    });
    $("#img_rand_code:visible, #img_rand_code2:visible").each(function() {
        this.naturalHeight > 0 ? $(document).trigger("randCodeLoaded", this.getAttribute("id")) : $(this).load(function() {
            $(this).unbind("load");
            $(document).trigger("randCodeLoaded", this.getAttribute("id"))
        })
    })
})

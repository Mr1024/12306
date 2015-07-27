function compressFunc() {
    return !1
}
var MANIFEST = chrome.runtime.getManifest(),
    INFOBAR = chrome.infobars || chrome.experimental && chrome.experimental.infobars,
    isDebug = (compressFunc + "").indexOf("false") != -1,
    bv = window.external.LiebaoGetVersion && window.external.LiebaoGetVersion() || /Chrome\/([\d\.]+)/i.exec(navigator.userAgent)[1],
    entry12306 = !1,
    log = function() {
        var n = function() {
            return this.print = function() {
                isDebug && console.log.apply(console, $.makeArray(arguments))
            }, this
        };
        return new n
    }(),
    notification = function() {
        var n = function() {
            var n = this,
                t = {};
            this.mapParam = function(n) {
                return {
                    type: n.type || "basic",
                    title: n.title || "提示",
                    message: n.message || "",
                    iconUrl: n.iconUrl || "/icons/icon_n.png",
                    priority: n.priority || 0,
                    eventTime: n.eventTime || null,
                    buttons: _.map(n.buttons, function(n) {
                        return {
                            title: n.title,
                            iconUrl: n.iconUrl || "/icons/icon_16.png"
                        }
                    }) || null,
                    imageUrl: n.imageUrl || null,
                    items: _.map(n.items, function(n) {
                        return {
                            title: n.title,
                            message: n.message
                        }
                    }) || null
                }
            };
            n.create = function(i) {
                var r = n.mapParam(i),
                    u = i.id || "";
                chrome.notifications.create(u, r, function(n) {
                    t[n] = i;
                    i.id = n
                });
                i.update = function() {
                    n.update(i)
                };
                i.clear = function() {
                    n.clear(i.id)
                }
            };
            n.update = function(t) {
                var i = n.mapParam(t);
                chrome.notifications.update(t.id, i, function() {
                    t.onUpdate && t.onUpdate.apply(t, $.makeArray(arguments))
                })
            };
            n.clear = function(n) {
                chrome.notifications.clear(n, function() {
                    opts.onClear && opts.onClear.apply(opts, $.makeArray(arguments))
                })
            };
            n.getAll = function(n) {
                chrome.notifications.getAll(n)
            };
            n.getPermissionLevel = function(n) {
                chrome.notifications.getPermissionLevel(n)
            };
            chrome.notifications.onClicked.addListener(function(n) {
                var i = t[n];
                i !== undefined && i !== null && $.isFunction(i.onClick) && i.onClick.apply(this)
            });
            chrome.notifications.onClosed.addListener(function(n, i) {
                var r = t[n];
                r !== undefined && r !== null && $.isFunction(r.onClose) && r.onClose.apply(this, [i])
            });
            chrome.notifications.onButtonClicked.addListener(function(n, i) {
                var r = t[n],
                    u;
                r !== undefined && r !== null && (u = r.buttons && r.buttons[i], u && $.isFunction(u.onClick)) && u.onClick.apply(r)
            });
            chrome.runtime.onMessage.addListener(function(t, i) {
                t.action === "showNotification" ? n.create({
                    message: t.detail.message,
                    title: t.detail.title,
                    iconUrl: t.detail.iconUrl
                }) : t.action === "notify" ? n.create(t.detail) : t.action === "attention" && i.tab && (chrome.tabs.update(t.detail && t.detail.tabid || i.tab.id, {
                    active: !0,
                    highlighted: !0
                }), chrome.windows.update(t.detail && t.detail.windowid, {
                    drawAttention: !0,
                    focused: !0,
                    state: "maximized"
                }))
            });
            chrome.runtime.onMessage.addListener(function(n, t) {
                n && n.action && n.action === "attention" && t.tab && (chrome.tabs.update(n.detail && n.detail.tabid || t.tab.id, {
                    active: !0,
                    highlighted: !0
                }), chrome.windows.update(n.detail && n.detail.windowid, {
                    drawAttention: !0,
                    focused: !0,
                    state: "maximized"
                }))
            })
        };
        return new n
    }(),
    CFG_MANGER;
(function() {
    var n, t, i, r = function(t) {
            t === n && (n = null)
        },
        u = function(r, u) {
            r === n && u === 0 && (chrome.tabs.update(t, {
                url: chrome.extension.getURL(i.detail.url.indexOf("/otn") != -1 ? "/infobar/main.html?new" : "/infobar/main.html"),
                selected: !0
            }, function() {}), chrome.notifications.clear("notLoadMessage", function() {}))
        };
    chrome.notifications.onClosed.addListener(r);
    chrome.notifications.onButtonClicked.addListener(u);
    chrome.runtime.onMessage.addListener(function(u, f) {
        u.action && u.action === "notLoadTip" && (i = u, t = f.tab.id, n ? chrome.notifications.update(n, {
            type: "basic",
            iconUrl: "/icons/icon_n.png",
            title: "订票助手未启动",
            message: "订票助手未加载，请点击工具栏『订票助手』图标并点击订票菜单来使用。",
            buttons: [{
                title: "或点击这里启动订票助手",
                iconUrl: "/infobar/theme/plus_16.png"
            }]
        }, function() {}) : chrome.notifications.create("", {
            type: "basic",
            iconUrl: "/icons/icon_n.png",
            title: "订票助手未启动",
            message: "订票助手未加载，请点击工具栏『订票助手』图标并点击订票菜单来使用。",
            buttons: [{
                title: "或点击这里启动订票助手",
                iconUrl: "/infobar/theme/plus_16.png"
            }]
        }, function(t) {
            n = t
        }), setTimeout(function() {
            r(n)
        }, 5e3))
    })
})();
CFG_MANGER = function() {
        function i() {
            var n = this,
                u = !1,
                i = null,
                f = 12e5,
                t = null,
                r;
            return this.baseConfig = {
                appendCacheTagHeader: !0,
                showRealSeatCount: !0,
                autoSubmitAfterVerifyCode: !0,
                autoLoginAfterVerifyCode: !0,
                rememberLoginUser: !0,
                rememberLoginPwd: !0,
                enableSoundPrompt: !0,
                enablePopupPrompt: !0,
                musicUrl: "http://static.liebao.cn/resources/audio/music2.ogg",
                submitOrderDelay: 5,
                refreshDelay: 5,
                autoWaitToSell: !0,
                keepOnline: !0,
                blockDynamicJs: !1,
                enableRealTimeTicketQuery: !0,
                showTicketPrice: !0,
                otnAutoConfirmOrderDelay: 0,
                dynamicAutoConfirmOrderDelay: 1e3,
                dynamicAutoSubmitOrderDelay: 5e3,
                otnAutoSubmitOrderDelay: 0,
                enableSelfTrack: !0,
                enableServerAutoChange: !0,
                enableAutoCaptcha: !0 && typeof window.external.LieBaoSign == "function",
                autoCaptchaFailedLimit: 5,
                captchaServerUrl: "http://api.12306.liebao.cn/code.php",
                appendPriceUnit: !0,
                blockVcVerify: !1,
                blockQueueCount: !1,
                chatServerApi: "http://12306.liebao.cn/index.php?r=Api/GetChatRoom"
            }, this.sysConfig = {}, this.userConfig = {
                enableAutoCaptcha: !1
            }, localStorage.sysConfig && (this.sysConfig = $.extend(this.sysConfig, JSON.parse(localStorage.sysConfig))), localStorage.userConfig && (this.userConfig = JSON.parse(localStorage.userConfig)), this.refresh = function() {
                n.config = $.extend({}, n.baseConfig, n.userConfig, n.sysConfig)
            }, this.refresh(), this.refresh = function() {
                t && (clearTimeout(t), t = null);
                (entry12306 || !u) && (i = new Date, $.getJSON("http://storage.fishlee.net/soft/files/44/rwticketconfig.json?" + Math.random(), function(t) {
                    (typeof t.enableAutoCaptcha == "undefined" || t.enableAutoCaptcha) && (t.enableAutoCaptcha = t.enableAutoCaptcha && typeof window.external.LieBaoSign == "function");
                    localStorage.sysConfig = JSON.stringify(t);
                    n.sysConfig = t;
                    n.config = $.extend({}, n.baseConfig, n.userConfig, n.sysConfig);
                    chrome.runtime.sendMessage({
                        action: "sysConfigUpdate",
                        detail: n.config
                    })
                }));
                var r = (new Date).getMinutes();
                t = r >= 50 || r <= 15 ? setTimeout(n.refresh, 6e5) : setTimeout(n.refresh, f)
            }, this.isEnabled = function() {}, r = function(t) {
                t && t.action === "enter12306" && (f = 12e5, (i === null || new Date - i >= 12e5) && n.refresh());
                t && t.action === "setUserConfig" && (n.userConfig = $.extend({}, n.userConfig, t.detail), n.config = $.extend({}, n.baseConfig, n.userConfig, n.sysConfig), localStorage.userConfig = JSON.stringify(n.userConfig), chrome.runtime.sendMessage({
                    action: "sysConfigUpdate",
                    detail: n.config
                }))
            }, chrome.runtime.onMessage.addListener(r), chrome.runtime.onMessageExternal.addListener(r), this.refresh(), u = !0, this
        }
        var n = new i,
            t = function(t, i, r) {
                t.action === "getSysConfig" && r({
                    action: "responseSysConfig",
                    detail: n.config
                });
                t.action === "getBaseSysConfig" && r({
                    action: "responseBaseSysConfig",
                    detail: $.extend(n.baseConfig, n.sysConfig)
                })
            };
        return chrome.runtime.onMessage.addListener(t), chrome.runtime.onMessageExternal.addListener(t), n
    }(),
    function() {
        window.localStorage.cv != MANIFEST.version && (window.localStorage.cv = MANIFEST.version, notification.create({
            title: "更新成功",
            message: "您的订票助手已成功更新至 " + MANIFEST.version + " :-)"
        }))
    }(),
    function() {
        if (localStorage.inforbarMode = INFOBAR ? "1" : "0", INFOBAR) {
            chrome.runtime.onMessage.addListener(function(n, t, i) {
                n.action && n.action == "isInforbarEnabled" && i(INFOBAR ? !0 : !1)
            });
            var n = function(n, t, i) {
                INFOBAR.show({
                    tabId: n,
                    height: 155,
                    path: "/infobar/" + t + ".html?" + (i ? "new" : "old") + n
                })
            };
            chrome.tabs.onUpdated.addListener(function(t, i, r) {
                i.status == "complete" && /https?:\/\/(www|dynamic|kyfw)\.12306\.cn\/otn.*/i.test(r.url) && n(r.id, "main", !0)
            })
        }
    }(),
    function() {
        function t(n) {
            var t = {};
            return n.split("; ").forEach(function(n) {
                var i = n.indexOf("=");
                t[n.substr(0, i)] = n.substr(i + 1)
            }), t
        }

        function i(n) {
            for (var a, o, h = n.url, c = !CFG_MANGER.config.blockDynamicJs, i = {}, e = null, l = null, f = 0; f < n.requestHeaders.length; ++f) {
                var s = n.requestHeaders[f],
                    r = s.name,
                    u = s.value;
                r === "User-Agent" ? i[r] = "Mozilla/5.0 (MSIE 9.0; Windows NT 6.1; Trident/5.0;)" : s.name == "TRefer" ? i.Referer = u : s.name == "Referer" ? i.Referer || u.indexOf("12306.cn") == -1 || (i.Referer = u) : r === "Cookie" ? (l = u, i.Cookie = u) : r.indexOf("Fish-") !== -1 ? (r = r.substr(5), r === "Cookie" ? e = t(u) : u ? i[r] = u : i[r] && delete i[r], c = !0) : i[r] || (i[r] = u)
            }
            e && (a = t(l), e = _.extend({}, a, e), i.Cookie = _.map(e, function(n, t) {
                return t + "=" + encodeURIComponent(n)
            }).join("; "));
            o = [];
            for (f in i) o.push({
                name: f,
                value: i[f]
            });
            return !c && $.isFunction(window.cbl) && window.cbl.call(n, h, i) ? {
                cancel: !0
            } : (CFG_MANGER.config.appendCacheTagHeader && h.indexOf("querySingleAction.do?method=queryLeftTicket") != -1 && (o.push({
                name: "If-None-Match",
                value: Math.random() + ""
            }), o.push({
                name: "Pragma",
                value: "No-cache"
            })), {
                requestHeaders: o
            })
        }
        var n = {
                urls: ["*://*.12306.cn/*"],
                types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
            },
            r = function(n) {
                var e = /trainClass=([^&]+)&/g.exec(n)[1],
                    u = e.replace(/%23/g, "#").split("#"),
                    t, o, r, f, s, i, h;
                if (u[0] == "QB") return null;
                t = [0, 0, 0, 0, 0];
                for (o in u) r = u[o], r == "D" ? t[0] = 1 : r == "Z" ? t[1] = 1 : r == "T" ? t[2] = 1 : r == "K" ? t[3] = 1 : r == "QT" && (t[4] = 1);
                for (f = [], s = ["D", "Z", "T", "K", "QT"], i = 0; i < t.length; i++) t[i] || (t[i] = Math.random() > .5 ? 1 : 0), t[i] && f.push(s[i]);
                return h = f.join("#") + "#", n.replace(e, escape(h))
            };
        chrome.webRequest.onBeforeSendHeaders.addListener(i, n, ["blocking", "requestHeaders"]);
        chrome.webRequest.onBeforeRequest.addListener(function() {
            return null
        }, n, ["blocking"])
    }();
(function() {
    window.chrome.extension.onRequest.addListener(function(n, t, i) {
        var u = n.action,
            r, f, e;
        if (u == "notify" && notification.create({
                title: n.title || "订票助手",
                message: n.message
            }), u == "ajax") {
            r = n.opt;
            r.headers = r.headers || {};
            f = {};
            for (e in r.headers) f["Fish-" + e] = r.headers[e];
            return r.headers = f, r.success = function(n, t, u) {
                i({
                    xhr: u,
                    status: t,
                    data: n,
                    success: !0,
                    opt: r
                })
            }, r.error = function(n, t, u) {
                i({
                    xhr: n,
                    status: t,
                    error: u,
                    success: !1,
                    opt: r
                })
            }, $.ajax(r), !0
        }
        if (u == "getRules") {
            i(window.rules.data);
            return
        }
        if (u == "refreshRule") {
            window.refreshRule();
            return
        }
    })
});
window.cbl = function(n) {
        for (var t in window.rules.block)
            if (window.rules.block[t].test(n)) return !0;
        return !1
    },
    function() {
        var n = null,
            u = "http://store.fishlee.net/files/44/rule.json?" + Math.random(),
            t = function() {
                n && (new Date - n) / 6e4 < 10 || $.get(u, function(i) {
                    try {
                        window.rules = JSON.parse(i);
                        f(i);
                        r()
                    } catch (u) {}
                    n = new Date;
                    setTimeout(t, 12e5)
                }, "text")
            },
            f = function(n) {
                localStorage.cn12306rule = n
            },
            i = function() {
                window.rules = localStorage.cn12306rule ? JSON.parse(localStorage.cn12306rule) : {
                    block: ["JsAction\\.do"],
                    data: 'window.cbl=function(n){return!1|/JsAction\\.do/i.test(n)};window.rc=function(n,t){var i,r,u;return/JsAction\\.do/i.test(n)?(i=/value\\.indexOf\\(\'([01])\'\\)/i.exec(t)&&RegExp.$1||"0",i=i=="0"?"1":"0",i=i.padRight(4,i),r="",u="key",t=t.replace(/(var\\s*)([a-z\\d_]+)\\s*=\\s*[\'"]([a-z\\d=]+)[\'"]/gi,function(n,t,f,e){return r=e,u=f,\'return "\'+r+":"+i+\'";\'}),t=t.replace(/window\\..*?Version/gi,"undefined"),t=t.replace(/(var\\s*([a-z]+)chek)/gi,"return "+u+\'+":\'+i+\'"; $1\'),t=t.replace(/(return\\s*key[^;]+)/gi,"return "+u+\'+":\'+i+\'";\'),t=t.replace(/=\\s*gc\\(\\s*\\)/gi,\'="\'+r+":"+i+\'"\'),t.replace(/(arr)=\\[[\\w\\W]+?\\]\\s*;/gi,"$1=[];")):t};window.dynamicLoad=function(n){$.each(["script[src*=\'JsAction.do\']"],n)}'
                };
                r();
                t()
            },
            r = function() {
                var n = [];
                $.each(window.rules.block, function() {
                    n.push(new RegExp(this + "", "gi"))
                });
                window.rules.block = n
            };
        window.refreshRule = function() {
            t()
        };
        CFG_MANGER.config.blockDynamicJs && i();
        chrome.runtime.onMessage.addListener(function(n) {
            n && n.action === "sysConfigUpdate" && CFG_MANGER.config.blockDynamicJs && i()
        })
    }(),
    function() {
        var f = window.external.LieBaoLookupDnsAddress ? 1 : 0;
        if (chrome.runtime.onMessage.addListener(function(n, t, i) {
                n && n.action === "servervalid" && i({
                    valid: f
                })
            }), chrome.runtime.onMessageExternal.addListener(function(n, t, i) {
                n && n.action === "servervalid" && i({
                    valid: f
                })
            }), f) {
            var k = "http://www.fishlee.net/apps/cn12306/ipservice/getlist",
                d = "http://www.fishlee.net/apps/cn12306/ipservice/update2",
                o = !1,
                n = {
                    count: 0,
                    valid: 0,
                    timeout: 0,
                    failed: 0,
                    lastUpdate: null,
                    validList: [],
                    status: 0
                },
                u = [],
                s = [],
                t = {
                    "kyfw.12306.cn": {
                        ip: null,
                        speed: null
                    }
                },
                h = [{
                    host: "kyfw.12306.cn",
                    url: "https://kyfw.12306.cn/otn/",
                    count: 0
                }],
                e = 0,
                i = {},
                a = !1;
            (function() {
                var i = function(i, r, f) {
                    i && i.action && (i.action === "getServerStatus" ? f(n) : i.action === "getServerList" ? f(n.status == 2 ? _.flatten([s, u]) : []) : i.action === "getCurrentServer" && f(t))
                };
                chrome.runtime.onMessage.addListener(i);
                chrome.runtime.onMessageExternal.addListener(i)
            })();
            var g = function(n, t) {
                    if (!n || n.length <= t) return n;
                    for (var i = [], r; i.length < t;) r = Math.floor(Math.random() * n.length), i.push(n.splice(r, 1));
                    return i
                },
                c = function() {
                    n.status = 1;
                    chrome.runtime.sendMessage({
                        action: "serverStateChange",
                        detail: {
                            state: n.status
                        }
                    });
                    chrome.runtime.sendMessage({
                        action: "track",
                        detail: {
                            type: 90
                        }
                    });
                    $.getJSON(k).done(function(t) {
                        t = _.groupBy(t, function(n) {
                            return n.host
                        });
                        for (var r in t) t[r] = g(t[r], 100);
                        t = _.flatten(t);
                        u = t;
                        n.count = t.length;
                        n.valid = n.timeout = n.failed = 0;
                        i && _.each(i, function(n, t) {
                            _.each(n, function(n) {
                                u.push({
                                    host: t,
                                    ip: n
                                })
                            })
                        });
                        nt()
                    }).fail(function() {
                        setTimeout(c, 6e5)
                    })
                },
                nt = function() {
                    s = [];
                    n.status = 2;
                    chrome.runtime.sendMessage({
                        action: "serverStateChange",
                        detail: {
                            state: n.status
                        }
                    });
                    v()
                },
                v = function() {
                    u.length ? tt(u.splice(0, 1), v) : it()
                },
                y = function(n, t) {
                    var i = new $.Deferred;
                    return chrome.tabs.httpRequest(n, "User-Agent: MSIE 9.0\r\nHost: " + t, 3e3, function(n) {
                        var t = null;
                        try {
                            t = JSON.parse(n)
                        } catch (e) {}
                        if (!t) {
                            i.reject(0, "unknown error.");
                            return
                        }
                        var f = t[0],
                            r = t[1],
                            u = t[2];
                        f ? i.resolve(u, r) : r === 10001 ? i.reject(0, "timeout") : i.reject(r, u)
                    }), i.promise()
                },
                tt = function(t, i) {
                    t = t[0];
                    t.host = t.host || "kyfw.12306.cn";
                    var r = "https://" + t.ip + "/otn/",
                        u = new Date;
                    y(r, t.host).done(function(n) {
                        t.speed = n && n.indexOf("客运服务") === -1 ? -2 : new Date - u
                    }).fail(function() {
                        t.speed = -1
                    }).always(function() {
                        t.status = t.speed == -1 || t.speed == -2 ? -1 : t.speed > 1e3 ? -2 : 1;
                        o && (t.status === -1 ? n.failed++ : t.status === -2 ? n.timeout++ : t.status === 0 ? n.timeout++ : (n.valid++, n.validList.push(t)));
                        s.push(t);
                        setTimeout(function() {
                            chrome.runtime.sendMessage({
                                action: "serverTestResult",
                                detail: t
                            });
                            i()
                        }, 100)
                    })
                },
                it = function() {
                    var t, i, u, f;
                    if (n.status = 3, chrome.runtime.sendMessage({
                            action: "serverStateChange",
                            detail: {
                                state: n.status
                            }
                        }), n.validList = _.groupBy(n.validList, function(n) {
                            return n.host
                        }), _.each(n.validList, function(n, t, i) {
                            n.sort(function(n, t) {
                                return n.speed === t.speed ? 0 : n.speed === -1 && t.speed !== -1 ? 1 : n.speed !== -1 && t.speed === -1 ? -1 : n.speed === 0 && t.speed !== 0 ? 1 : n.speed !== 0 && t.speed === 0 ? -1 : n.speed - t.speed
                            });
                            i[t] = n.splice(0, 20)
                        }), n.status = 0, n.lastUpdate = new Date, chrome.runtime.sendMessage({
                            action: "serverStateChange",
                            detail: {
                                state: n.status
                            }
                        }), o) {
                        t = [];
                        _.each(s, function(n) {
                            var i = _.pick(n, "ip", "averageSpeed", "host");
                            i.averageSpeed = n.speed;
                            t.push(i)
                        });
                        i = _.groupBy(t, function(n) {
                            return n.host
                        });
                        u = {};
                        for (f in i) u[f] = JSON.stringify(i[f]);
                        chrome.runtime.sendMessage({
                            action: "track",
                            detail: {
                                type: 91
                            }
                        });
                        $.post(d, u);
                        localStorage.serverStorage = JSON.stringify(n)
                    } else {
                        if (_.flatten(n.validList).length < 5) {
                            o = !0;
                            n.validList = [];
                            c();
                            return
                        }
                        localStorage.serverStorage = JSON.stringify(n)
                    }
                    r()
                },
                rt = function() {
                    _.each(t, function(n) {
                        n.ip && window.external.LieBaoSetHostAddress(n.host, n.ip, 1)
                    })
                };
            setInterval(rt, 2e4);
            var l = function(n, t) {
                    chrome.runtime.sendMessage({
                        action: "track",
                        detail: {
                            type: 92,
                            values: [t]
                        }
                    });
                    t ? window.external.LieBaoSetHostAddress(n, t, 1) : window.external.LieBaoSetHostAddress(n, i[n][0], 0)
                },
                p = 2e4,
                r = function() {
                    if (entry12306) {
                        var i = function(i) {
                            var c = h[e],
                                u = c.host,
                                o, f, s;
                            if (CFG_MANGER.config.enableServerAutoChange)
                                if (i > 3e3 || i > 500 && ++t[u].count >= 5) {
                                    if (t[u].count = 0, t[u].ip) {
                                        t[u].ip = null;
                                        l(u, null);
                                        setTimeout(r, 1e3);
                                        return
                                    }
                                    if (o = n.validList[u], f = o[Math.floor(Math.random() * o.length)], f && f.ip && (o[0].speed < i || i <= 0)) {
                                        t[u].rate = Math.max(Math.floor((f.speed - i) * 1e3 / i), 10) / 10;
                                        t[u].ip = f.ip;
                                        l(u, f.ip);
                                        setTimeout(r, 1e3);
                                        return
                                    }
                                } else t[u].speed = i, t[u].count = 0;
                            chrome.runtime.sendMessage({
                                action: "serverStateChange",
                                detail: {
                                    state: n.status
                                }
                            });
                            e++;
                            e >= h.length ? (e = 0, !a && entry12306 && (s = [], _.each(t, function(t, i) {
                                var r = n.validList[i],
                                    u;
                                r && r.length && t.speed > r[0].speed && (u = Math.max(Math.floor((t.speed - r[0].speed) * 1e3 / t.speed), 10) / 10, t.ip = r[0].ip, t.speed = r[0].speed, t.rate = u, l(i, t.ip), s.push(t.ip + "(加速 " + u + "%)"))
                            }), s.length && chrome.runtime.sendMessage({
                                action: "showNotification",
                                detail: {
                                    title: "订票助手已优化服务器",
                                    message: "订票助手已为您选择最快的服务器：" + s.join("; ") + "。",
                                    iconUrl: "/icons/icon_128.png"
                                }
                            }), chrome.runtime.sendMessage({
                                action: "serverStateChange",
                                detail: {
                                    state: n.status
                                }
                            }), a = !0), setTimeout(r, p), p += 5e3) : r()
                        };
                        ut(h[e].url, i)
                    } else setTimeout(r, 5e3)
                },
                ut = function(n, t) {
                    var i = new Date;
                    $.ajax(n, {
                        dataType: "text",
                        method: "GET",
                        timeout: 3e3
                    }).done(function() {
                        t(new Date - i)
                    }).fail(function() {
                        t(999999)
                    })
                },
                ft = function() {
                    localStorage.serverStorage && (n = JSON.parse(localStorage.serverStorage));
                    !n.lastUpdate || (new Date).getTime() / 36e5 - new Date(n.lastUpdate).getTime() / 36e5 >= 12 || n.validList.length < 5 ? (o = !0, n.validList = [], c()) : (u = n.validList, r())
                },
                et = function() {
                    var n = 0;
                    if (_.each(h, function(t) {
                            i[t.host] = _.filter(window.external.LieBaoLookupDnsAddress(t.host, "false").split(";"), function(n) {
                                return n || !1
                            });
                            i[t.host] && i[t.host].length || n++
                        }), n) {
                        f = -1;
                        return
                    }
                    y("https://" + i["kyfw.12306.cn"][0] + "/otn/", "kyfw.12306.cn").done(function() {
                        ft()
                    }).fail(function() {
                        f = -1
                    })
                },
                w = !1,
                b = function() {
                    localStorage.lastUsed = Math.floor((new Date).getTime() / 864e5);
                    w || (w = !0, et());
                    entry12306 = !0
                };
            chrome.runtime.onMessage.addListener(function(n) {
                n && n.action === "triggerUpdate" && b()
            });
            chrome.runtime.onMessageExternal.addListener(function(n) {
                n && n.action === "triggerUpdate" && b()
            });
            setInterval(function() {
                entry12306 = !1;
                chrome.tabs.query({
                    url: "*://*.12306.cn/*"
                }, function(n) {
                    entry12306 |= n && n.length > 0
                });
                chrome.tabs.query({
                    url: "*://12306.liebao.cn/*"
                }, function(n) {
                    entry12306 |= n && n.length > 0
                })
            }, 2e4)
        }
    }(),
    function() {
        var t = "http://liebao.tjweb.ijinshan.com/click/__infoc.gif?actionname=liebao_80",
            i = "http://service.fishlee.net/report/44/",
            n = function(n, r) {
                var f, u;
                r = r || [];
                CFG_MANGER.config.enableSelfTrack && $.post(i, {
                    t: n,
                    d: r.join(":")
                });
                f = {
                    type: n
                };
                for (u in r) r[u] && (f["value" + (parseInt(u) + 1)] = r[u] + "");
                $.get(t, f)
            };
        chrome.runtime.onMessage.addListener(function(t) {
            t && t.action && t.action === "track" && n(t.detail.type, t.detail.values)
        });
        chrome.runtime.onMessageExternal.addListener(function(t) {
            t && t.action && t.action === "track" && n(t.detail.type, t.detail.values)
        });
        n(99, [MANIFEST.version, bv])
    }(),
    function() {
        var u = parseInt(/Chrome\/(\d+)/i.exec(navigator.userAgent)[1]),
            f = "http://www.fishlee.net/service/update2/44/" + (u < 34 ? "44" : "60") + "/version_v6" + (INFOBAR ? "" : "_1") + ".json?" + Math.random(),
            t = null,
            e = !1,
            o = null,
            s = null,
            n = null,
            h = function(n, t) {
                for (var f, e, i = n.split("."), r = t.split("."), o = Math.min(i.length, r.length), u = 0; u < o; u++) {
                    if (f = parseInt(i[u]), e = parseInt(r[u]), f < e) return -1;
                    if (f > e) return 1
                }
                return i.length > r.length ? 1 : i.length < r.length ? -1 : 0
            },
            i = function() {
                $.getJSON(f, function(t) {
                    n = t;
                    o = t.version;
                    s = t.notify;
                    n.hasUpdate = e = h(MANIFEST.version, t.version) < 0;
                    chrome.runtime.sendMessage({
                        action: "updateInfoRefreshed",
                        detail: n
                    })
                });
                t = new Date
            },
            r = function(r, u, f) {
                r && r.action && (r.action === "getUpdateInfo" ? f(n) : r.action === "getVersionInfo" ? f({
                    curVersion: MANIFEST.version,
                    updateInfo: n
                }) : r.action === "triggerUpdate" ? (!t || new Date - t >= 3e5) && i() : r.action === "getBv" && f({
                    bv: bv
                }))
            };
        chrome.runtime.onMessage.addListener(r);
        chrome.runtime.onMessageExternal.addListener(r);
        i()
    }(),
    function() {
        var n = function(n, t, i) {
            if (n && n.action === "captcha" && CFG_MANGER.config.captchaServerUrl) {
                var r;
                return $.ajax(CFG_MANGER.config.captchaServerUrl, {
                    method: "POST",
                    data: {
                        pic: n.detail.base64,
                        sign: window.external.LieBaoSign(n.detail.base64)
                    },
                    timeout: 3e3
                }).done(function(n) {
                    r = n.success ? n.code.replace(/\s/g, "") : ""
                }).fail(function() {
                    r = ""
                }).always(function() {
                    i({
                        code: r
                    })
                }), !0
            }
        };
        chrome.runtime.onMessage.addListener(n);
        chrome.runtime.onMessageExternal.addListener(n)
    }(),
    function() {
        var n = function(n, t, i) {
            if (n.action === "getStorage") i({
                action: "sendStorage",
                detail: localStorage
            });
            else if (n.action === "setStorage" && n.detail) _.each(n.detail, function(n, t) {
                n ? localStorage.setItem(t, n) : localStorage.removeItem(t)
            }), i({
                action: "sendStorage",
                detail: n.detail
            });
            else if (n.action === "notify") {
                var r = new Notification(n.title || "订票助手", {
                    body: n.content || null,
                    icon: "/icons/icon_n.png"
                });
                setTimeout(function() {
                    r.close()
                }, 5e3)
            }
        };
        chrome.runtime.onMessageExternal.addListener(n)
    }(),
    function() {
        var n = [],
            i = [],
            t = [],
            r = null,
            o = function() {
                r = null;
                f.disconnect();
                t = [];
                i = []
            },
            s = function(n, r) {
                if (n && n.action) switch (n.action) {
                    case "getChatServerStatus":
                        e.loadServers(function(n) {
                            r.postMessage({
                                action: "responseServer",
                                detail: n
                            })
                        });
                        break;
                    case "getCurrentRoomInfo":
                        r.postMessage({
                            action: "responseCurrentRoomInfo",
                            detail: f.currentRoom
                        });
                        break;
                    case "enterChatRoom":
                        f.connect(n.detail);
                        break;
                    case "chatRoomSendMsg":
                        n.detail.roomid || (n.detail.roomid = f.currentRoom.id);
                        $.post("http://12306.liebao.cn/index.php?r=Api/SentMessage", {
                            data: JSON.stringify(n)
                        }).done(function(n) {
                            n.resCode === 0 || r.postMessage({
                                action: "sendMessageFailed",
                                detail: n.message
                            })
                        }).fail(function() {
                            r.postMessage({
                                action: "sendMessageFailed",
                                detail: "聊天服务器繁忙，发送失败"
                            })
                        });
                        break;
                    case "disconnectChatRoom":
                        t = [];
                        i = [];
                        f.disconnect()
                }
            },
            h = function(t) {
                var i = _.indexOf(n, t);
                i > -1 && n.splice(i, 1);
                r || (r = setTimeout(o, 18e5))
            },
            u = function(r) {
                if (r && r.action === "chatRoomReceiveMsg") {
                    if (!n.length) {
                        i.push(r);
                        return
                    }
                    t.push(r);
                    t.length > 20 && t.splice(0, 1)
                }
                n.forEach(function(n) {
                    n.postMessage(r)
                });
                r && r.action === "chatRoomConnected" && (t.length && t.forEach(function(t) {
                    n.forEach(function(n) {
                        n.postMessage(t)
                    })
                }), i.length && (i.forEach(function(t) {
                    n.forEach(function(n) {
                        n.postMessage(t)
                    })
                }), i = []))
            },
            e, f;
        chrome.runtime.onConnectExternal.addListener(function(t) {
            n.push(t);
            t.onMessage.addListener(s);
            t.onDisconnect.addListener(h);
            r && (clearTimeout(r), r = null)
        });
        e = function() {
            var r = null,
                t = !1,
                n = null,
                i = [],
                f = null,
                o = function(t, i) {
                    if (n) {
                        var r = _.findWhere(n, {
                            id: t
                        });
                        r && (r.onlinecount = i)
                    }
                },
                e = function() {
                    for (var t; i.length;)(t = i.pop()) && t(n)
                },
                s = function(u) {
                    u && (r && (!f || new Date - f < 6e5) ? u(n) : (i.push(u), t || (t = !0, $.post(CFG_MANGER.config.chatServerApi, null, null, "json").done(function(i) {
                        n = i;
                        t = !1;
                        r = !0;
                        e()
                    }).fail(function() {
                        n = null;
                        t = !1;
                        e()
                    }))))
                };
            return chrome.runtime.onMessage.addListener(function(n) {
                n && n.action && (n.action === "serverStateChange" || n.action === "sysConfigUpdate") && u(n)
            }), {
                loadServers: s,
                setRoomCount: o
            }
        }();
        f = function() {
            var t = null,
                n = null,
                l = this,
                i = null,
                r, s = function() {
                    n && n.readyState === 1 && n.send("h")
                },
                h = function(o) {
                    t = o;
                    var h = t.url;
                    r = o.id;
                    n !== null && n.url !== h && f();
                    n === null ? (n = new WebSocket(h, []), n.onclose = function() {
                        n = null;
                        u({
                            action: "chatRoomDisconnected"
                        });
                        $.post("http://12306.liebao.cn/index.php?r=Api/GetRoomOnlineNum", {
                            roomId: r
                        })
                    }, n.onopen = function() {
                        u({
                            action: "chatRoomConnected"
                        });
                        t.heartbeat && !i && (i = setInterval(s, t.heartbeat));
                        $.post("http://12306.liebao.cn/index.php?r=Api/GetRoomOnlineNum", {
                            roomId: r
                        })
                    }, n.onmessage = function(n) {
                        var r = n.data,
                            i;
                        r.indexOf("+h") !== 0 && (i = JSON.parse(JSON.parse(n.data).msg), i.action === "chatRoomSendMsg" && (i.action = "chatRoomReceiveMsg"), i.action === "chatUpdateOnline" && (t.onlinecount = i.detail.count, e.setRoomCount(t.id, t.onlinecount)), u(i))
                    }, n.onerror = function() {
                        try {
                            n.close()
                        } catch (t) {}
                    }, u({
                        action: "chatRoomConnecting"
                    })) : u({
                        action: "chatRoomConnected"
                    })
                },
                c = function(t) {
                    n !== null && n.send(JSON.stringify(t))
                },
                f = function() {
                    n && (n.close(), n = null);
                    t && $.post("http://12306.liebao.cn/index.php?r=Api/GetRoomOnlineNum", {
                        roomId: r
                    });
                    t = null;
                    i && (clearInterval(i), i = null)
                },
                o = {
                    connect: h,
                    disconnect: f,
                    sendMsg: c
                };
            return Object.defineProperty(o, "currentRoom", {
                get: function() {
                    return t
                }
            }), o
        }()
    }(),
    function() {
        var n = JSON.parse(localStorage.alarm || "[]"),
            f = "/infobar/theme/plus_16.png",
            e = "/icons/icon_n.png",
            r = null,
            t = {},
            u = function() {
                localStorage.alarm = JSON.stringify(n)
            },
            o = function(n) {
                if (t[n]) {
                    var i = t[n],
                        r = i.data;
                    delete t[n];
                    chrome.tabs.create({
                        active: !0,
                        url: "http://12306.liebao.cn/#ALARM-" + encodeURIComponent(JSON.stringify(r))
                    })
                }
            },
            i;
        chrome.notifications.onButtonClicked.addListener(o);
        i = function() {
            var o, s, h;
            for (r = null, o = !1, s = {}; n.length > 0 && n[0].time <= (new Date).getTime();) h = n.shift(), s[h.group] = h, o = !0;
            o && _.each(s, function(n) {
                var i = "ALARM-" + n.data.fromCode + "-" + n.data.toCode + (new Date).getTime();
                chrome.runtime.sendMessage({
                    action: "track",
                    detail: {
                        type: 132,
                        values: [n.type || 0, n.point || 0]
                    }
                });
                chrome.notifications.create(i, {
                    type: "basic",
                    iconUrl: e,
                    title: n.group,
                    message: n.text,
                    buttons: [{
                        title: "立刻打开订票页面",
                        iconUrl: f
                    }]
                }, function(r) {
                    i = r;
                    t[i] = n;
                    setTimeout(function() {
                        delete t[r];
                        chrome.notifications.clear(r, function() {})
                    }, 1e4)
                })
            });
            n.length && (r = setTimeout(i, 3e4));
            o && u()
        };
        chrome.runtime.onMessageExternal.addListener(function(t) {
            if (t && t.action && t.action === "setAlarmTask") {
                var f = t.detail;
                _.each(f, function(t) {
                    n.push(t)
                });
                n.sort(function(n, t) {
                    return n.time - t.time
                });
                u();
                r || i()
            }
        });
        i()
    }()

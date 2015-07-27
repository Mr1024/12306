function compressFunc() {
    return !1
}
var i18n = {
        t_d: "动车",
        t_g: "高铁",
        t_k: "普客",
        t_zt: "直达或特快"
    },
    seatType = {
        "9": "商务",
        P: "特等",
        M: "一等",
        O: "二等",
        "6": "高软",
        "4": "软卧",
        "3": "硬卧",
        "2": "软座",
        "1": "硬座",
        "0": "无座"
    },
    seatTypeFull = {
        "9": "商务座",
        P: "特等座",
        M: "一等座",
        O: "二等座",
        "6": "高软软卧",
        "4": "软卧",
        "3": "硬卧",
        "2": "软座",
        "1": "硬座",
        "0": "无座"
    },
    seatTypeDisplayOrder = "9PMO643210",
    sysConfig = null,
    NONINFOBARMODE = location.search.length <= 4 || !parseInt(location.search.slice(4)),
    LARGEICON = "/icons/icon_128.png",
    ISOTN = location.search.indexOf("?new") === 0,
    evtTag = Math.random() + "";
$(function() {
    $("a[data-toggle=tooltip], label[data-toggle=tooltip], input[data-toggle=tooltip], button[data-toggle=tooltip]").bsTooltip();
    $(document).popover({
        selector: "[data-toggle=popover]"
    })
});
var log = new function() {
        var n = (compressFunc + "").indexOf("false") != -1;
        this.print = function() {
            n && console.log.apply(console, $.makeArray(arguments))
        }
    },
    message = function() {
        var t = function() {
                var n = this,
                    t = {};
                NONINFOBARMODE ? chrome.tabs.getCurrent(function(t) {
                    n.tab = t;
                    n.tabid = t.id;
                    n.host = ISOTN ? "http://kyfw.12306.cn/" : "http://dynamic.12306.cn/";
                    $(document).trigger("tabidUpdate")
                }) : (n.tabid = parseInt(location.search.substr(4)), chrome.tabs.get(n.tabid, function(t) {
                    n.tab = t;
                    n.host = /(https?:\/\/[a-z]+\.12306.cn\/)/.exec(t.url) && RegExp.$1;
                    ISOTN = n.tab.url.indexOf("/otn") !== -1;
                    $(document).trigger("tabidUpdate")
                }));
                this.sendToTab = function(t, i) {
                    n.tabid && (t = $.extend(t, {
                        tag: evtTag
                    }), chrome.tabs.sendMessage(n.tabid, t, i || function() {}))
                };
                this.send = function(n, t) {
                    n = $.extend(n, {
                        tag: evtTag
                    });
                    chrome.runtime.sendMessage(n, t || function() {})
                };
                this.sendActionToTab = function(t, i, r) {
                    n.tabid && chrome.tabs.sendMessage(n.tabid, {
                        action: t,
                        tag: evtTag,
                        detail: i
                    }, r || function() {})
                };
                this.sendAction = function(n, t, i) {
                    chrome.runtime.sendMessage({
                        action: n,
                        tag: evtTag,
                        detail: t
                    }, i || function() {})
                };
                this.addAction = function(n, i) {
                    var r = t[n] = t[n] || [];
                    r.push(i)
                };
                chrome.runtime.onMessage.addListener(function(i, r, u) {
                    if ((!r.tab || r.tab.id == n.tabid || r.tab.url.indexOf("background.html") != -1) && i && i.action && (!i.tag || i.tag !== evtTag)) {
                        log.print(i);
                        var e = i.action,
                            f = t[e];
                        f && $.each(f, function() {
                            this.call(i.detail, u, i, r)
                        })
                    }
                })
            },
            n = new t;
        return NONINFOBARMODE || n.addAction("sysConfigUpdate", function() {
            log.print("NONINFOBAR mode, dispatch messages to tab.");
            n.sendToTab({
                action: "sysConfigUpdate",
                detail: this
            })
        }), n
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
                    iconUrl: n.iconUrl || "/icons/icon_128.png",
                    priority: n.priority || 0,
                    eventTime: n.eventTime || null,
                    buttons: _.map(n.buttons, function(n) {
                        return {
                            title: n.title,
                            iconUrl: n.iconUrl
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
            message.addAction("pageNotification", function() {
                n.create(this)
            });
            message.addAction("pageNotify", function() {
                n.create(this)
            })
        };
        return new n
    }();
(function() {
    var n = $(document),
        t = !1,
        i = function() {
            $("input[data-sysconfigkey], select[data-sysconfigkey]").each(function() {
                var t = this,
                    i = $(this),
                    r = t.type,
                    u = t.dataset.sysconfigkey,
                    f = sysConfig,
                    n = f[u];
                typeof n == "boolean" ? r === "radio" ? $("input[name=" + t.name + "][value=" + (n ? 1 : 0) + "]")[0].checked = !0 : r === "checkbox" ? t.checked = n : i.val(n ? "1" : "0") : i.val(n)
            })
        };
    n.on("change", "[data-sysconfigkey]", function() {
        var n = this,
            i = $(this),
            r = n.type,
            u = n.dataset.sysconfigkey,
            f = sysConfig,
            e = f[u];
        f[u] = typeof e == "boolean" ? r == "radio" ? $("input[name=" + n.name + "]:checked")[0].value == "1" : r === "checkbox" ? n.checked : i.val() == "1" : typeof e == "number" ? parseInt(i.val() + "") : $.trim(i.val());
        t = !0;
        log.print("SYSCONFIG changed by user action. sending message to notify clients.");
        chrome.runtime.sendMessage({
            action: "sysConfigUpdate",
            detail: sysConfig
        });
        t = !1
    });
    $(document).on("sysConfigUpdated", i);
    chrome.runtime.sendMessage({
        action: "getSysConfig"
    }, function(t) {
        typeof t != "undefined" && t || alert("警告！无法加载助手配置，请重新启动浏览器！");
        log.print("sysconfig updated.");
        sysConfig = t.detail;
        n.trigger("sysConfigUpdated")
    });
    message.addAction("sysConfigUpdate", function() {
        t || (sysConfig = this, n.trigger("sysConfigUpdated"))
    })
})()

function getCurrentStationInfo() {
    if (!document.getElementById("fromStationText")) return null;
    return {
        fromText: $("#fromStationText").val(),
        fromCode: $("#fromStation").val(),
        toText: $("#toStationText").val(),
        toCode: $("#toStation").val(),
        depDate: $("#train_date").val()
    }
}
var queryStatics = null,
    currentProfile = null,
    tagOtnMap = {
        9: "SWZ",
        P: "TZ",
        M: "ZY",
        O: "ZE",
        "6": "GR",
        "4": "RW",
        "3": "YW",
        "2": "RZ",
        "1": "YZ",
        "0": "WZ",
        "*": "QT"
    },
    tagRevMap = _.invert(tagOtnMap),
    seatNameMap = {
        "商务座": "SWZ",
        "特等座": "TZ",
        "一等座": "ZY",
        "二等座": "ZE",
        "高级软卧": "GR",
        "软卧": "RW",
        "硬卧": "YW",
        "软座": "RZ",
        "硬座": "YZ",
        "无座": "WZ"
    },
    seatNameInvMap = _.invert(seatNameMap),
    $doc = $(document),
    ISLOGINED = $.trim($("#regist_out").text()) != "注册",
    currentUser;
unsafeInvoke(function() {
    var n = new Audio("http://static.liebao.cn/resources/audio/music2.ogg");
    n.loop = !0;
    window.jPlayer = function(t) {
        t === "play" ? n.play() : t === "stop" && n.pause()
    }
});
unsafeInvoke(function() {
    var t = window,
        i = jQuery,
        r, n = function(n, t) {
            document.body.dispatchEvent(new CustomEvent("$_$", {
                detail: {
                    action: n,
                    detail: t
                }
            }))
        },
        u = function(n, t) {
            document.addEventListener("$_$", function(i) {
                i && i.detail && i.detail.action && i.detail.action === n && t.call(i.detail.detail || {})
            })
        },
        f;
    u("dr", function() {
        r = this
    });
    u("eval", function() {
        n("dr", eval(this.code))
    });
    f = function(t) {
        return r = null, n("dd", t), r || t
    };
    t.dhtmlx.modalbox.hide = function(t) {
        return function() {
            t.apply(this, arguments);
            n("qf")
        }
    }(t.dhtmlx.modalbox.hide);
    i(document).ajaxComplete(function(t, i, r) {
        if (r.url.indexOf("autoSubmitOrderRequest") != -1) {
            if (!r.data) return;
            var u = function(n) {
                n = n.split("&");
                var t = {};
                return n.forEach(function(n) {
                    var i = n.split("=");
                    t[i[0]] = i[1]
                }), t
            }(r.data);
            n("autoSubmitOrder", [u.query_from_station_name, u.query_to_station_name, u.train_date, (u.passengerTicketStr || "").split("_").length - 1, "", u.purpose_codes])
        }
        r.url.indexOf("leftTicket/query") !== -1 && n("qr", {
            opt: {
                url: r.url,
                data: r.data,
                type: r.type
            },
            text: i.responseText,
            headers: i.getAllResponseHeaders()
        })
    }).ajaxSend(function(t, i, r) {
        r.url.indexOf("leftTicket/query") !== -1 && n("qs", {
            opt: {
                url: r.url,
                data: r.data,
                type: r.type
            }
        })
    }).ajaxError(function(t, i, r) {
        if (r.url.indexOf("leftTicket/query") !== -1) {
            var u = i.statusText;
            if ("timeout" == u || "No Transport" == u || "abort" == u) return;
            n("qe", {
                opt: {
                    url: r.url,
                    data: r.data,
                    type: r.type
                },
                text: i.responseText,
                headers: i.getAllResponseHeaders()
            })
        }
    });
    i.ajaxSetup({
        accepts: {
            json: "text/json, application/json"
        },
        contents: {
            json: /json/
        },
        converters: {
            "text json": function() {
                return f(jQuery.parseJSON.apply(this, jQuery.makeArray(arguments)))
            }
        }
    });
    t.refreshImg = function(t) {
        return function(i, r, u) {
            t.apply(this, $.makeArray(arguments));
            u === "img_rand_code2" ? n("autoSubmit") : i === "login" && n("login");
            u = u || "img_rand_code";
            var f = document.getElementById(u),
                e = function() {
                    n("randCodeLoaded", u)
                };
            f && (f.naturalHeight > 0 ? e() : $(f).load(function() {
                e()
            }))
        }
    }(t.refreshImg);
    i(document).on("click", "#relogin_close", function() {
        n("loginCancelled")
    });
    t.loginAsyn = function(t) {
        return function(i) {
            t.apply(this, $.makeArray(arguments));
            n("loginSuccess", {
                name: i
            })
        }
    }(t.loginAsyn);
    i.fn.val = function(n) {
        return function() {
            var t = $.makeArray(arguments),
                r = n.apply(this, t),
                i;
            return $.inArray(this.attr("id"), ["train_date", "fromStation", "toStation"]) !== -1 && t.length > 0 && t[0] && (i = document.createEvent("UIEvents"), i.initUIEvent("change", !0, !0), this.each(function() {
                this.dispatchEvent(i)
            })), r
        }
    }(i.fn.val);
    t.myJpopup && (t.myJpopup.startOrHiden = function(i) {
        return function() {
            t.myJpopup.isShow() ? n("promptDismiss") : n("prompt");
            i.apply(this, $.makeArray(arguments))
        }
    }(t.myJpopup.startOrHiden));
    t.renderCheckTickInfo && (t.renderCheckTickInfo = function(t) {
        return function() {
            t.apply(this, $.makeArray(arguments));
            n("renderCheckTickInfo")
        }
    }(t.renderCheckTickInfo))
});
$(document).on("routePage", function() {
    sysConfig.blockVcVerify && unsafeInvoke(function() {
        $.ajaxTransport("+*", function(n) {
            if (n.url.indexOf("checkRandCodeAnsyn") != -1) return {
                send: function(n, t) {
                    t(200, "ok", {
                        json: {
                            validateMessagesShowId: "_validatorMessage",
                            status: !0,
                            httpstatus: 200,
                            data: "Y",
                            messages: [],
                            validateMessages: {}
                        }
                    }, {})
                },
                abort: function() {}
            }
        })
    })
});
(function() {
    document.body.addEventListener(evtTag, function(n) {
        var t = n.detail;
        t && $doc.trigger(t.action, [t.detail])
    });
    $(document).on("dispatch", function() {
        document.dispatchEvent(new CustomEvent(evtTag, {
            detail: {
                action: arguments[1],
                detail: arguments[2] || null
            }
        }))
    }).on("autoSubmitOrder", function() {
        msg.sendAction("autoSubmitOrder")
    })
})(),
function() {
    (function() {
        var n = null;
        $doc.on("sysConfigUpdated", function() {
            if (sysConfig)
                if (sysConfig.keepOnline) log.print("init keep-online timer."), n = setInterval(function() {
                    $.post("/otn/login/checkUser")
                }, 6e5);
                else {
                    n && (clearInterval(n), n = null);
                    return
                }
        }).trigger("sysConfigUpdated")
    })()
}();
$(document).bind(EVT_ONLOGINPAGE, function() {
    msg.on("fillUserInfo", function() {
        this.name && $("#username").val(this.name);
        this.pwd ? ($("#password").val(this.pwd), document.getElementById("randCode").focus()) : $("#password")[0].focus()
    });
    chrome.runtime.sendMessage({
        action: "getLastUser"
    }, function(n) {
        n.name && $("#username").val(n.name);
        n.pwd ? ($("#password").val(n.pwd), $("#randCode")[0].focus()) : $("#password")[0].focus()
    });
    $("#randCode").keyup(function() {
        if (sysConfig.autoLoginAfterVerifyCode && this.value.length >= 4) {
            var n = $("#loginSub, #loginSubAsyn");
            n.length && (msg.sendAction("notify", {
                title: "提示",
                message: "已尝试自动登录，等待12306回应。如卡太久，请重试一次。",
                iconUrl: "/icons/icon_128.png"
            }), n.nativeClick(10))
        }
    });
    $("#loginSub, #loginSubAsyn").on("click", function() {
        var n = {
            tempUser: $("#username").val(),
            tempPwd: $("#password").val()
        };
        n.tempUser && n.tempPwd && chrome.runtime.sendMessage({
            action: "logTempUser",
            detail: n
        })
    });
    $(document).bind("login", function() {
        chrome.runtime.sendMessage({
            action: "pageInitCall",
            detail: {
                page: "onLoginPage"
            }
        })
    }).bind("loginCancelled", function() {
        chrome.runtime.sendMessage({
            action: "pageInitCall",
            detail: {
                page: "onQueryPage",
                logined: !1
            }
        })
    }).bind("loginSuccess", function(n, t) {
        var i = t.name;
        log.print(t);
        chrome.runtime.sendMessage({
            action: "logTempUserSuccess",
            detail: {
                name: i
            }
        });
        chrome.runtime.sendMessage({
            action: "pageInitCall",
            detail: {
                page: "onQueryPage",
                logined: !0
            }
        });
        ISLOGINED = !0;
        $(document).trigger("userLogined");
        $(document).trigger(EVT_ONMAINPAGE)
    })
});
$(document).bind(EVT_ONQUERYPAGE, function() {
        var n = !1,
            i = !0,
            r = !1,
            t = null;
        (function() {
            var n = evalCode.eval("[tour_flag, ClickWho]");
            (r = n[0] == "gc", r) && (t = {}, t.fromText = $("#fromStationText").val(), t.fromCode = $("#fromStation").val(), t.toText = $("#toStationText").val(), t.toCode = $("#toStation").val(), t.depDate = $("#train_date").val(), t.studentTicket = n[1] == "0X00")
        })(),
        function() {
            $(document).on("applyUser", function() {
                currentUser.rawPassenger && currentUser.rawPassenger.length ? evalCode.eval("window.passengerAll=" + JSON.stringify(currentUser.rawPassenger) + ",$.renderPassenger();") : evalCode.eval("$.reloadPassenger(), $('#sel-buyer').hide();");
                currentUser.options.showMore ? $("#show_more").not(".up") && document.getElementById("show_more").click() : $("#show_more").is(".up") && document.getElementById("show_more").click()
            })
        }(),
        function() {
            var r = function() {
                currentProfile.selectedTrain = _.map(currentProfile.selectedTrain, function(n) {
                    return tagMap[n] || n
                })
            };
            $(document).on("applyProfile", function() {
                n = !0;
                r();
                currentProfile.fromText && $("#fromStationText").val(currentProfile.fromText);
                currentProfile.fromCode && $("#fromStation").val(currentProfile.fromCode);
                currentProfile.toText && $("#toStationText").val(currentProfile.toText);
                currentProfile.toCode && $("#toStation").val(currentProfile.toCode);
                new Date < new Date(currentProfile.depDate) && $("#train_date").val(currentProfile.depDate);
                i && $(document).trigger("restoreTrain", [currentProfile.selectedTrain]);
                i && $doc.trigger("restoreSeat", [currentProfile.selectedSeatType]);
                i && $doc.trigger("restorePassenger", [currentProfile.passengers]);
                i && $doc.trigger("restoreDateLoop", [currentProfile.dateloop]);
                i && $doc.trigger("restoreMisc");
                n = !1
            });
            msg.on("getStationInfo", function(n) {
                n({
                    detail: getCurrentStationInfo()
                })
            });
            evalCode.eval("window.page_show_flag") == "index" && chrome.runtime.sendMessage({
                action: "stationInfoUpdate",
                detail: getCurrentStationInfo()
            });
            $doc.on("change", "#fromStationText, #fromStation, #toStationText, #toStation, #train_date", function() {
                n || chrome.runtime.sendMessage({
                    action: "stationInfoUpdate",
                    detail: getCurrentStationInfo()
                })
            });
            chrome.runtime.sendMessage({
                action: "getCurrentUser"
            }, function(n) {
                currentUser = n.detail;
                currentProfile = _.extend(currentUser.currentProfile, _.omit(t, "depDate"));
                $(document).trigger("applyUser");
                $(document).trigger("applyProfile");
                i = !1;
                msg.on("profileChanged", function() {
                    currentProfile = _.extend(this, _.omit(t, "depDate"));
                    currentProfile = this;
                    r();
                    $(document).trigger("applyProfile");
                    $(document).trigger("profileChanged")
                });
                msg.on("profileReload", function() {
                    $("#clearAll")[0].click();
                    i = !0;
                    currentProfile = this;
                    r();
                    $(document).trigger("applyProfile");
                    $(document).trigger("profileChanged")
                })
            })
        }(),
        function() {
            $(document).on("restoreDateLoop", function(i, r) {
                n = !0;
                $.each(r, function() {
                    var n = $("#date-list input[value='" + this + "']:not(:checked)");
                    n.length && n[0].click()
                });
                $("#prior_date").find("span:gt(0) a").click(t);
                n = !1
            });
            $("#sel-date :checkbox").click(function() {
                if (!n) {
                    n = !0;
                    var i = this.value;
                    this.checked ? (msg.sendAction("addDateLoop", i), $("#prior_date span[name=" + i + "] a").click(t)) : msg.sendAction("removeDateLoop", i);
                    n = !1
                }
            });
            var t = function() {
                var n = $(this).closest("span"),
                    t = n.attr("name");
                msg.sendAction("removeDateLoop", t)
            };
            msg.on("removeDateLoop", function() {
                $("#prior_date span[name=" + this + "] a")[0].click()
            });
            msg.on("addDateLoop", function() {
                var n = $("#date-list input[value='" + this + "']:not(:checked)");
                n.length && n[0].click()
            })
        }(),
        function() {
            $(document).on("restoreSeat", function(i, r) {
                n = !0;
                r.length > 5 && msg.sendAction("pageNotification", {
                    id: "seatNumOutTip",
                    title: "提示",
                    message: "由于12306的自动刷票不支持针对5个以上的席别进行检测，因此超出的部分席别将会失效。请使用订票助手的自动刷票。"
                });
                $.each(r.slice(0, 5), function() {
                    var n = $("#sel-seat input[value='" + tagOtnMap[this] + "']:not(:checked)");
                    n.length && n[0].click()
                });
                $("#prior_seat").find("span:gt(0) a").click(t);
                n = !1
            });
            $("#sel-seat :checkbox").click(function() {
                var i = this.value,
                    r = tagRevMap[i];
                this.checked ? (n || msg.sendAction("addSeat", r), $("#prior_seat span[name='" + seatNameInvMap[i] + "'] a").click(t)) : n || msg.sendAction("removeSeat", r)
            });
            var t = function() {
                var t = $(this).closest("span"),
                    i = t.attr("name"),
                    r = tagRevMap[seatNameMap[i]];
                n || msg.sendAction("removeSeat", r)
            };
            msg.on("removeSeat", function() {
                n = !0;
                $("#prior_seat span[name='" + seatNameInvMap[tagOtnMap[this]] + "'] a")[0].click();
                n = !1
            });
            msg.on("addSeat", function() {
                if ($("#prior_seat span").length >= 6) {
                    msg.sendAction("pageNotification", {
                        id: "seatNumOutTip",
                        title: "提示",
                        message: "由于12306的自动刷票不支持针对5个以上的席别进行检测，因此超出的部分席别无法应用到12306自带刷票中。请使用订票助手的自动刷票。"
                    });
                    return
                }
                n = !0;
                var t = $("#sel-seat input[value='" + tagOtnMap[this] + "']:not(:checked)");
                t.length && t[0].click();
                n = !1
            });
            msg.on("seatReset", function() {
                n = !0;
                $("#prior_seat span:gt(0) a").click();
                $(document).trigger("restoreSeat", [this]);
                n = !1
            })
        }(),
        function() {
            var r = function() {
                    msg.sendAction("pageNotification", {
                        id: "addFailedTip",
                        title: "提示",
                        message: "添加联系人失败，请先将联系人保存到常用联系人中。"
                    })
                },
                t = function(n) {
                    var t = $("#buyer-list li"),
                        i = n.name + "(" + n.typename + ")(" + n.id + ")";
                    return $(_.find($.makeArray(t), function(n) {
                        return $.trim($(n).text()) === i
                    }))
                },
                i;
            $(document).on("restorePassenger", function(u, f) {
                n = !0;
                $.each(f, function() {
                    var n = t(this).find(":checkbox"),
                        i;
                    n.length ? n.is(":checked") || n[0].click() : (i = toRawPassenger(this), evalCode.eval("(function(){window.passengerAll.push(" + JSON.stringify(i) + "); $.renderPassenger();})()"), n = t(this).find(":checkbox"), n.length ? n.is(":checked") || n[0].click() : r())
                });
                $("#setion_postion").find("span:gt(0) a.close").click(i);
                n = !1
            });
            $(document).on("click", "#buyer-list :checkbox", function() {
                if (!n) {
                    n = !0;
                    var r = $(this).closest("li"),
                        u = r.getTrimedText(),
                        t = /^(.*?)\(([^\)]+)\)\(([^\)]+)\)$/.exec(u);
                    this.checked ? (msg.sendAction("addPassenger", {
                        name: t[1],
                        typename: t[2],
                        id: t[3]
                    }), $("#setion_postion span:gt(0):last a").click(i)) : msg.sendAction("removePassenger", {
                        name: t[1],
                        typename: t[2],
                        id: t[3]
                    });
                    n = !1
                }
            });
            i = function() {
                var t = $(this).closest("span"),
                    i = t.attr("name"),
                    n = /^(.*?)\(([^\)]+)\)\(([^\)]+)\)$/.exec(i);
                msg.sendAction("removePassenger", {
                    name: n[1],
                    typename: n[2],
                    id: n[3]
                })
            };
            msg.on("removePassenger", function() {
                var n = this.name + "(" + this.typename + ")(" + this.id + ")";
                $("#setion_postion span[name='" + n + "'] a.close")[0].click()
            });
            msg.on("addPassenger", function() {
                var u = this.name + "(" + this.typename + ")(" + this.id + ")",
                    n = t(this).find(":checkbox"),
                    i;
                n.length ? n.is(":checked") || n[0].click() : (i = toRawPassenger(this), evalCode.eval("window.passengerAll.push(" + JSON.stringify(i) + "); $.renderPassenger();"), n = t(this).find(":checkbox"), n.length ? n.is(":checked") || n[0].click() : r())
            })
        }(),
        function() {
            var r = function() {},
                t, i;
            $(document).on("restoreTrain", function(i, u) {
                n = !0;
                var f = [],
                    e = !1,
                    o = [];
                $.each(u, function() {
                    var n = (this + "").toUpperCase();
                    if (n) {
                        if (!/^[A-Z]?\d+$/i.test(n)) {
                            e = !0;
                            return
                        }
                        o.push(n);
                        f.push("<span class='sel-box w80'>{{TRAIN}}<a class='close' href='javascript:' onclick='$.removeSel(this,\"{{TRAIN}}\",4)'><\/a><\/span>".replace(/{{TRAIN}}/g, n))
                    }
                });
                $("#prior_train").find("span:gt(0)").remove().end().append(f.join("")).find("span a").click(t);
                evalCode.eval("window.ccSelected=[" + _.map(o, function(n) {
                    return "'" + n + "'"
                }).join(", ") + "]");
                n = !1;
                e && r()
            });
            $("#add-train").click(function() {
                if (!n) {
                    n = !0;
                    var t = $("#prior_train span:gt(0):last");
                    t && (msg.sendAction("addTrain", $.trim(t.text())), n = !1)
                }
            });
            t = function() {
                var n = $(this).closest("span");
                msg.sendAction("removeTrain", $.trim(n.text()))
            };
            i = function(n) {
                var t = $.makeArray($("#prior_train span:gt(0)"));
                return _.find(t, function(t) {
                    return $.trim($(t).text()) == n
                })
            };
            msg.on("removeTrain", function() {
                var n = i(this);
                n && $(n).find("a")[0].click()
            });
            msg.on("addTrain", function() {
                var n = (this + "").toUpperCase(),
                    u = i(n);
                if (!u) {
                    if (!/^[A-Z]?\d+$/i.test(n)) {
                        r();
                        return
                    }
                    $("#prior_train").append("<span class='sel-box w80'>{{TRAIN}}<a class='close' href='javascript:' onclick='$.removeSel(this,\"{{TRAIN}}\",4)'><\/a><\/span>".replace(/{{TRAIN}}/g, n)).find("span:last a").click(t);
                    evalCode.eval('window.ccSelected.push("' + this + '")')
                }
            })
        }(),
        function() {
            n = !0;
            $doc.on("restoreMisc", function() {
                $("#_prior").val(currentProfile.selectSeatFirst ? "1" : "2");
                $("#autoSubmit:enabled").prop("checked", currentProfile.autoSubmitEnabled);
                $("#partSubmit:enabled").prop("checked", currentProfile.partialSubmitEnabled);
                currentProfile.studentTicket ? document.getElementById("sf2").click() : document.getElementById("sf1").click();
                n = !1
            });
            var t = function() {
                var t, i, r;
                n = !0;
                t = $(this).attr("id");
                t === "sf1" || t === "sf2" ? msg.sendAction("miscChanged", {
                    key: "studentTicket",
                    value: document.getElementById("sf2").checked
                }) : t === "_prior" ? msg.sendAction("miscChanged", {
                    key: "selectSeatFirst",
                    value: $(this).val() === "1"
                }) : (i = t === "autoSubmit" ? "autoSubmitEnabled" : "partialSubmitEnabled", r = this.checked, msg.sendAction("miscChanged", {
                    key: i,
                    value: r
                }));
                n = !1
            };
            msg.on("miscChanged", function() {
                var i, t, r;
                if (!n)
                    if (i = this.key, t = this.value, i === "studentTicket") {
                        if (t === document.getElementById("sf2").checked) return;
                        document.getElementById("sf" + (t ? "2" : "1")).click()
                    } else if (i === "selectSeatFirst") {
                    if (t = t ? "1" : "2", $("#_prior").val() === t) return;
                    $("#_prior").val(t)
                } else if (i === "partialSubmitEnabled" || i === "autoSubmitEnabled") {
                    if (r = i === "autoSubmitEnabled" ? "autoSubmit" : "partSubmit", document.getElementById(r).checked === t) return;
                    $("#" + r).prop("checked", t).change()
                }
            });
            $("#_prior, #autoSubmit, #partSubmit").change(t);
            $("#sf1, #sf2").click(t)
        }(),
        function() {
            $("#show_more").click(function() {
                var n = $(this);
                msg.sendAction("userOptionChanged", {
                    showMore: n.hasClass("up")
                })
            })
        }(),
        function() {
            var t = function() {
                msg.sendAction("queryStop", getCurrentStationInfo())
            };
            msg.on("startQuery", function(t) {
                var i, r;
                if (log.print("query"), $("#query_ticket.btn-disabled").length) {
                    alert("亲，查询按钮还是灰色，咱不着急，稍安勿躁 :-)");
                    t({
                        canquery: !1
                    });
                    return
                }
                log.print("正在尝试查票，时间：" + new Date);
                $("#auto_query:not(:checked)").length && document.getElementById("autoSubmit").disabled == !1 && currentProfile.autoSubmitEnabled && $("#auto_query")[0].click();
                document.getElementById("autoSubmit").disabled || !currentProfile.autoSubmitEnabled || document.getElementById("autoSubmit").checked || (document.getElementById("autoSubmit").checked = !0);
                n = !0;
                this.date && $("#train_date").val(this.date);
                !this.byAuto;
                currentProfile.byAuto = this.byAuto;
                i = $("#query_ticket");
                i[0].click();
                log.print("正在尝试查票，已点击，时间：" + new Date);
                r = i.hasClass("btn-disabled") || i.text().indexOf("停止") != -1;
                t({
                    canquery: r,
                    sysAuto: i.text().indexOf("停止") != -1
                });
                n = !1
            });
            msg.on("stopQuery", function() {
                var n = $("#query_ticket");
                n.text().indexOf("停止") != -1 && n[0].click()
            });
            $(document).on("prompt", function() {
                t();
                var n = $("#filterRes").text();
                msg.sendAction("notify", {
                    iconUrl: "/icons/icon_128.png",
                    title: "灰来约票！",
                    message: "主淫，快来把票推倒啊！" + n
                });
                msg.sendAction("attention")
            }).on("autoSubmit", function() {
                t();
                msg.sendAction("notify", {
                    iconUrl: "/icons/icon_128.png",
                    title: "灰来约票！",
                    message: "主淫，快来输入验证码把票推倒啊！"
                });
                msg.sendAction("attention");
                setTimeout(function() {
                    document.getElementById("img_rand_code2").focus()
                }, 100)
            });
            $("#query_ticket").click(function() {
                if (!n) {
                    var i = $(this);
                    if (i.data("suspend")) {
                        i.removeData("suspend");
                        return
                    }
                    $("#train_date").change();
                    setTimeout(function() {
                        (i.text().indexOf("停止") == -1 || i.hasClass("btn-disabled")) && t()
                    }, 10)
                }
            })
        }();
        msg.sendAction("setResignMode", {
            profile: t
        })
    }),
    function() {
        var n;
        $doc.on("getTrainFilterData", function(t) {
            t.result = n
        });
        $doc.on("dd", function(t, i) {
            var r = i,
                u, f, e;
            Array.isArray(r.data) && r.data.length && r.data[0].queryLeftNewDTO && (n = {
                raw: r,
                rawTrainMap: {},
                trainMap: {},
                auto: null,
                nextTime: null
            }, _.each(r.data, function(t) {
                var i = {
                        id: t.queryLeftNewDTO.train_no,
                        code: t.queryLeftNewDTO.station_train_code,
                        available: t.queryLeftNewDTO.canWebBuy === "Y" ? 1 : 0,
                        start: {
                            code: t.queryLeftNewDTO.start_station_telecode,
                            name: t.queryLeftNewDTO.start_station_name
                        },
                        from: {
                            code: t.queryLeftNewDTO.from_station_telecode,
                            fromStationNo: t.queryLeftNewDTO.from_station_no,
                            name: t.queryLeftNewDTO.from_station_name,
                            endpoint: t.queryLeftNewDTO.from_station_telecode == t.queryLeftNewDTO.start_station_telecode,
                            time: t.queryLeftNewDTO.start_time
                        },
                        to: {
                            code: t.queryLeftNewDTO.to_station_telecode,
                            toStationNo: t.queryLeftNewDTO.to_station_no,
                            name: t.queryLeftNewDTO.to_station_name,
                            endpoint: t.queryLeftNewDTO.end_station_telecode == t.queryLeftNewDTO.to_station_telecode,
                            time: t.queryLeftNewDTO.arrive_time
                        },
                        elapsedTime: {
                            days: t.queryLeftNewDTO.day_difference,
                            total: t.queryLeftNewDTO.lishi
                        },
                        end: {
                            code: t.queryLeftNewDTO.end_station_telecode,
                            name: t.queryLeftNewDTO.end_station_name
                        },
                        ypinfo: t.queryLeftNewDTO.yp_info,
                        ypinfo_ex: t.queryLeftNewDTO.yp_ex,
                        locationCode: t.queryLeftNewDTO.location_code,
                        controlDay: t.queryLeftNewDTO.control_day,
                        supportCard: t.queryLeftNewDTO.is_support_card,
                        saleTime: t.queryLeftNewDTO.sale_time,
                        secureStr: t.secretStr,
                        selltime: null
                    },
                    u = _.pairs(getTicketInfo(t.queryLeftNewDTO.yp_info)),
                    r;
                i.price = _.object(_.filter(u, function(n) {
                    return n[0][0] === "_"
                }));
                i.tickets = _.object(_.filter(u, function(n) {
                    return n[0][0] !== "_"
                }));
                r = /(0*(\d+)月0*(\d+)日)?(\d+)\s*点\s*((\d+)分)?\s*起售/i.exec(t.buttonTextInfo.replace(/<.*?>/g, ""));
                r && (i.available = -1, i.selltime = new Date, i.selltime.setHours(parseInt(r[4])), i.selltime.setMinutes(parseInt(r[6] || "0", 10)), i.selltime.setSeconds(0), r[1] && (i.selltime.setMonth(parseInt(r[2]) - 1), i.selltime.setDate(parseInt(r[3])), i.selltime.getMonth() < (new Date).getMonth() && i.selltime.setFullYear(i.selltime.getFullYear() + 1)));
                n.rawTrainMap[i.id] = t;
                n.trainMap[i.id] = i
            }), n.original = _.values(n.trainMap), n.available = n.original, n.trainCodes = _.pluck(n.original, "code"), n.filtered = [], n.include = n.available, $(document).trigger("filterTrains", n), $(document).trigger("processTrains", n), n.filtered && n.filtered.length && (u = _.toMap(r.data, function(n) {
                return n.queryLeftNewDTO.train_no
            }), f = _.map(n.filtered, function(n) {
                return u[n.id]
            }), n.rawDataFiltered = _.without.apply(null, [r.data].concat(f)), r.data = n.rawDataFiltered, $doc.trigger("dispatch", ["dr", r])), currentProfile.selectedTrain.length && (e = _.pluck(n.include, "code"), $doc.trigger("restoreTrain", [e])))
        })
    }(),
    function() {
        $(document).bind("qr", function() {
            $doc.trigger("prepareResult");
            $doc.trigger("trainListComplete")
        })
    }(),
    function() {
        var n;
        $(document).bind("performAutoSubmit", function(t, i) {
            (n = i, n) && evalCode.eval('submitOrderRequest("' + n.data.secureStr + '", "' + n.data.from.time + '");')
        })
    }(),
    function() {
        var n;
        $(document).on("prepareResult", function() {
            var i, r;
            if (typeof sysConfig == "undefined") {
                $(document).bind("sysConfigUpdated", function() {
                    document.dispatchEvent(new CustomEvent("qr"))
                });
                return
            }
            i = new $.Event("getTrainFilterData");
            $doc.trigger(i);
            i.result ? n = i.result : (r = $("#queryLeftTable tr"), n = {
                raw: null,
                rawTrainMap: {},
                trainMap: {},
                auto: null,
                nextTime: null
            }, r.each(function() {
                var f = $(this),
                    e = f.find("td:eq(0)>div>div"),
                    a = e.eq(0).find("a"),
                    h, u, c, l, v, r;
                if (a.length) {
                    var s = a.attr("id").split("_"),
                        i = {
                            id: s[0],
                            from: {
                                code: s[1]
                            },
                            to: {
                                code: s[2]
                            }
                        },
                        o = e.eq(0).find(">span").attr("id").split("_");
                    i = _.extend(i, {
                        fromStationNo: o[1],
                        toStationNo: o[2],
                        ypinfo: o[3],
                        seatTypes: o[4].split("")
                    });
                    i.tickets = getTicketInfo(i.ypinfo);
                    h = _.pairs(getTicketInfo(i.ypinfo));
                    i.price = _.object(_.filter(h, function(n) {
                        return n[0][0] === "_"
                    }));
                    i.tickets = _.object(_.filter(h, function(n) {
                        return n[0][0] !== "_"
                    }));
                    u = e.eq(1).find("strong");
                    i.from.name = $.trim(u.eq(0).text());
                    i.from.endpoint = u.eq(0).hasClass("start-s");
                    i.to.name = $.trim(u.eq(1).text());
                    i.to.endpoint = u.eq(1).hasClass("end-s");
                    c = e.eq(2).find("strong");
                    i.from.time = $.trim(c.eq(0).text());
                    i.to.time = $.trim(c.eq(1).text());
                    l = f.find("td:last a");
                    l.length ? (i.available = 1, i.secureStr = /\(['"](.*?)['"]\)/.exec(l.attr("onclick"))[1]) : (i.available = 0, v = $.trim(f.find("td:last")), r = /(0*(\d+)月0*(\d+)日)?(\d+)\s*点\s*((\d+)分)?\s*起售/i.exec(t.buttonTextInfo.replace(/<.*?>/g, "")), r && (i.available = -1, i.selltime = new Date, i.selltime.setHours(parseInt(r[4])), train.selltime.setMinutes(parseInt(r[6] || "0", 10)), i.selltime.setSeconds(0), r[1] && (i.selltime.setMonth(parseInt(r[2]) - 1), i.selltime.setDate(parseInt(r[3])), i.selltime.getMonth() < (new Date).getMonth() && i.selltime.setFullYear(i.selltime.getFullYear() + 1))));
                    f.data("ticket", i);
                    n.trainMap[i.id] = i
                }
            }), n.original = _.values(n.trainMap), n.available = n.original, n.trainCodes = _.pluck(n.original, "code"), n.filtered = [], n.include = n.available, $(document).trigger("filterTrains", n), $(document).trigger("processTrains", n), n.filtered && n.filtered.length && _.each(n.filtered, function() {
                var n = $("#ticket_" + this.id);
                n.remove()
            }));
            sysConfig.showRealSeatCount && _.each(n.original, function(n) {
                $.each(n.tickets, function(t, i) {
                    if (t[0] !== "_") {
                        var r = n.price["_" + t],
                            u = $("#" + tagOtnMap[t] + "_" + n.id),
                            f = i == 0 ? "无" : i;
                        i && u.addClass("t-num");
                        r && sysConfig.showTicketPrice && (f += "<br /><span style='font-size:11px; color:blue;font-weight:normal; font-family: Arial;'>" + (sysConfig.appendPriceUnit ? "¥" : "") + r / 10 + "<\/span>");
                        u.html(f)
                    }
                })
            })
        })
    }();
$doc.bind(EVT_ONQUERYPAGE, function() {
    $(document).on("keyup", "#randCode2", function() {
        !this.value || this.value.length < 4 || sysConfig.otnAutoConfirmOrderDelay < 0 || $("#qr_submit.btn92s").nativeClick(sysConfig.otnAutoConfirmOrderDelay).length && msg.sendAction("notify", {
            title: "提示",
            message: "已自动提交，等待12306回应。如卡太久，请重试一次。",
            iconUrl: "/icons/icon_128.png"
        })
    }).bind("autoSubmit", function() {
        setTimeout(function() {
            $("#randCode2").nativeFocus()
        }, 500)
    })
});
$doc.on("renderCheckTickInfo", function() {
    sysConfig.otnAutoConfirmOrderDelay >= 0 && setTimeout(function() {
        $("#qr_submit_id.btn92s").nativeClick().length ? msg.sendAction("notify", {
            title: "提示",
            message: "已自动提交，等待12306回应。如卡太久，请重试一次。",
            iconUrl: "/icons/icon_128.png"
        }) : msg.sendAction("notify", {
            title: "提示",
            message: "未能帮你自动提交，请尽快手动提交。",
            iconUrl: "/icons/icon_128.png"
        })
    }, sysConfig.otnAutoConfirmOrderDelay)
});
$(document).bind(EVT_ONSUBMITPAGE, function() {
    var i = null,
        e = !1,
        n = evalCode.eval("window.ticketInfoForPassengerForm"),
        t, r, u, o, f, s, h;
    unsafeInvoke(function() {
        $(document).ajaxComplete(function(n, t, i) {
            var r = new CustomEvent("ajax", {
                detail: {
                    url: i.url,
                    status: t.status,
                    resp: t.responseText,
                    data: i.data,
                    type: i.type
                }
            });
            document.dispatchEvent(r)
        })
    });
    o = function() {
        (t = i && i.auto && i.auto.passengers || currentProfile && currentProfile.passengers, t) && (r = _.findWhere(t, {
            type: "3"
        }), u = _.findWhere(n.limitBuySeatTicketDTO.ticket_type_codes, {
            id: "3"
        }), _.each(t, function(n) {
            n.key = n.name + "_" + n.idtype + "_" + n.id
        }), u || (_.each(t, function(n) {
            n.type = "1"
        }), r = !1), f())
    };
    f = function() {
        var o, e;
        (n.purpose_codes == "0X00" || r && u) && !$("#normal_passenger_id li").length ? o = setInterval(function() {
            $("#normal_passenger_id li").length && (clearInterval(o), f())
        }, 300) : (n.tour_flag != "gc" && (n.purpose_codes === "0X00" || r ? ($("#show_more_passenger_id")[0].click(), $.each(t, function() {
            $("input:checkbox[id^='normalPassenger_" + this.key + "']")[0].click()
        })) : (e = !1, $.each(t, function() {
            e ? $("div.add-per > span")[0].click() : e = !0;
            var n = $("#ticketInfo_id tr:not(.tips):last");
            n.find("td:eq(2) select").val(this.type);
            n.find("td:eq(3) input").val(this.name);
            n.find("td:eq(4) select").val(this.idtype);
            n.find("td:eq(5) input").val(this.id);
            n.find("td:last :checkbox").prop("checked", this.save)
        }))), i && i.auto && $("select[id^=seatType_]").val(i.auto.seat === "0" ? "1" : i.auto.seat), t && t.length && setTimeout(function() {
            document.getElementById("randCode").focus()
        }, 500))
    };
    msg.on("enableSubmitOrder", function() {
        e = !0;
        $("#randCode").keyup()
    });
    $("#randCode").keyup(function() {
        e && sysConfig.autoSubmitAfterVerifyCode && this.value.length >= 4 && $("#submitOrder_id").nativeClick(1).length && msg.sendAction("notify", {
            title: "提示",
            message: "已自动提交，等待12306回应。如卡太久，请重试一次。",
            iconUrl: "/icons/icon_128.png"
        })
    });
    $("#submitOrder_id").click(function() {
        sysConfig.autoSubmitAfterVerifyCode && $("#qr_submit_id:visible").nativeClick(1)
    });
    document.addEventListener("ajax", function(n) {
            var t = n.detail;
            t.url.indexOf("method=getQueueCount") !== -1 && setTimeout(function() {
                for (var t = parent.$("#queue_note").closest(".ui-dialog").find("button"), n = 0; n < t.length; n++) $.trim(t.eq(n).text()).replace(/\s/g, "") === "确定" && t[n].click()
            }, 1e3)
        }),
        function() {
            var t = {
                date: new Date(n.orderRequestDTO.train_date.time).format("yyyy-MM-dd"),
                from: n.orderRequestDTO.from_station_telecode,
                to: n.orderRequestDTO.to_station_telecode,
                td: n.orderRequestDTO.train_no,
                code: n.purpose_codes,
                tcode: n.station_train_code
            };
            chrome.runtime.sendMessage({
                action: "reportSubmitInfo",
                detail: t
            })
        }();
    s = function() {
        chrome.runtime.sendMessage({
            action: "getLastAutoData"
        }, function(n) {
            i = n;
            o()
        })
    };
    h = function() {
        chrome.runtime.sendMessage({
            action: "getCurrentUser"
        }, function(n) {
            currentProfile = n.detail.currentProfile;
            s()
        })
    };
    h()
});
$doc.bind("routePage", function() {
        var n = location.pathname.slice(5),
            u = location.search.slice(1),
            i = !1,
            t = function(n) {
                i = !0;
                var t = ISLOGINED ? $.trim($("#login_user").text()) : "";
                chrome.runtime.sendMessage({
                    action: "pageInitCall",
                    detail: {
                        page: n,
                        logined: ISLOGINED,
                        username: t
                    }
                });
                $(document).trigger(n)
            },
            r;
        n === "login/init" && t(EVT_ONLOGINPAGE, !0);
        (n === "" || n === "index/init") && ISLOGINED && (r = $("#login_user").getTrimedText(), chrome.runtime.sendMessage({
            action: "logTempUserSuccess",
            detail: {
                name: r
            }
        }));
        n === "leftTicket/init" && (ISLOGINED || $(document).trigger(EVT_ONLOGINPAGE), t(EVT_ONQUERYPAGE));
        (n === "confirmPassenger/initDc" || n === "confirmPassenger/initGc" || n === "confirmPassenger/initWc") && t(EVT_ONSUBMITPAGE);
        i || chrome.runtime.sendMessage({
            action: "onUnvalidPage"
        })
    }),
    function() {
        var n = !1,
            t, i;
        $(function() {
            n = !0
        });
        document.readyState === "complete" ? n || $.ready() : (t = function() {
            document.readyState === "complete" && (clearInterval(i), n || $.ready())
        }, i = setInterval(t, 100))
    }()

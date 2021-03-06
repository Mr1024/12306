function getCurrentStationInfo() {
    return document.getElementById("fromStationText") ? {
        fromText: $("#fromStationText").val(),
        fromCode: $("#fromStation").val(),
        toText: $("#toStationText").val(),
        toCode: $("#toStation").val(),
        depDate: $("#startdatepicker").val()
    } : null
}
$(document).bind(EVT_ONLOGINPAGE, function() {
    msg.on("fillUserInfo", function() {
        this.name && $("input[name='loginUser.user_name']").val(this.name);
        this.pwd ? ($("input[name='user.password']").val(this.pwd), document.getElementById("randCode").focus()) : $("input[name='user.password']")[0].focus()
    });
    chrome.runtime.sendMessage({
        action: "getLastUser"
    }, function(n) {
        n.name && $("input[name='loginUser.user_name']").val(n.name);
        n.pwd ? ($("input[name='user.password']").val(n.pwd), $("#randCode")[0].focus()) : $("input[name='user.password']")[0].focus()
    });
    $("#randCode").keyup(function() {
        sysConfig.autoLoginAfterVerifyCode && this.value.length >= 4 && $("#subLink")[0].click()
    });
    $(window).on("unload", function() {
        var n = {
            tempUser: $("input[name='loginUser.user_name']").val(),
            tempPwd: $("input[name='user.password']").val()
        };
        n.tempUser && n.tempPwd && chrome.runtime.sendMessage({
            action: "logTempUser",
            detail: n
        })
    })
});
$(document).bind(EVT_ONQUERYPAGE, function() {
    var n = null,
        t = function() {
            currentProfile.selectedTrain = _.map(currentProfile.selectedTrain, function(n) {
                return tagMap[n] || n
            })
        },
        i = function() {
            t();
            currentProfile.fromText && $("#fromStationText").val(currentProfile.fromText);
            currentProfile.fromCode && $("#fromStation").val(currentProfile.fromCode);
            currentProfile.toText && $("#toStationText").val(currentProfile.toText);
            currentProfile.toCode && $("#toStation").val(currentProfile.toCode);
            new Date < new Date(currentProfile.depDate) && $("#startdatepicker").val(currentProfile.depDate)
        };
    msg.on("getStationInfo", function(n) {
        n({
            detail: getCurrentStationInfo()
        })
    });
    $doc.on("change", "#fromStationText, #fromStation, #toStationText, #toStation, #startdatepicker", function() {
        chrome.runtime.sendMessage({
            action: "stationInfoUpdate",
            detail: getCurrentStationInfo()
        })
    });
    $doc.on("click", "#submitQuery, #submitQuery_stu", function() {
        chrome.runtime.sendMessage({
            action: "stationInfoUpdate",
            detail: getCurrentStationInfo()
        })
    });
    chrome.runtime.sendMessage({
        action: "getCurrentProfile"
    }, function(n) {
        currentProfile = n.detail;
        i()
    });
    msg.on("profileChanged", function() {
        log.print("queryprofile updated.");
        currentProfile = this;
        t();
        i();
        $(document).trigger("profileChanged")
    });
    msg.on("startQuery", function(t) {
        this.date && $("#startdatepicker").val(this.date);
        currentProfile.byAuto = this.byAuto;
        this.byAuto || chrome.runtime.sendMessage({
            action: "stationInfoUpdate",
            detail: getCurrentStationInfo()
        });
        var i = new CustomEvent("requestQueryTicket", {
            detail: {
                config: {
                    isStudent: currentProfile.studentTicket
                }
            }
        });
        document.dispatchEvent(i);
        t({
            canquery: n
        })
    });
    unsafeInvoke(function() {
        var n, t;
        window.removeLoadMsg ? (n = window.removeLoadMsg, window.removeLoadMsg = function() {
            n.apply(this, arguments);
            document.dispatchEvent(new CustomEvent("queryComplete"))
        }) : window.mygrid.parse && (t = window.mygrid.parse, window.mygrid.parse = function() {
            t.apply(this, arguments);
            document.dispatchEvent(new CustomEvent("queryComplete"))
        });
        document.addEventListener("requestQueryTicket", function(n) {
            var t, i;
            (window.clickBuyStudentTicket = n.detail.config.isStudent ? "Y" : "N", t = canquery(), document.dispatchEvent(new CustomEvent("canquery", {
                detail: t
            })), t) && (i = n.detail.config, sendQueryFunc.call(i.isStudent ? document.getElementById("stu_submitQuery") : document.getElementById("submitQuery")))
        });
        $("body").ajaxError(function(n, t, i) {
            i.url.indexOf("queryLeftTicket") !== -1 && document.dispatchEvent(new CustomEvent("qe"))
        })
    });
    document.addEventListener("canquery", function(t) {
        n = t.detail
    });
    document.addEventListener("queryComplete", function() {
        log.print("queryticket completed.");
        $(document).trigger("preprocessQueryResult").trigger("processQueryResult").trigger("processedQueryResult")
    })
});
$(document).bind(EVT_ONQUERYPAGE, function() {
    $(document).on("preprocessQueryResult", function() {
        log.print("show real tickets.");
        var n = $("#gridbox table table tr:gt(0)");
        n.each(function() {
            var t = $(this),
                r = t.find("td"),
                i = t.find(".btn130_2"),
                n;
            i.length && (n = getTicketInfo(i.attr("onclick")), t.data("ticketdata", n), sysConfig.showRealSeatCount && r.each(function(t) {
                if (seatOrder[t]) {
                    var i = $(this),
                        r = $.trim(i.text());
                    r == "有" && n[seatOrder[t]] > 0 ? n["_" + seatOrder[t]] && sysConfig.showTicketPrice ? i.html("<span style='font-weight:bold;color:#008800;'>" + n[seatOrder[t]] + "<\/span><br /><small style='font-weight:lighter;color:blue;font-size:10px; font-family: Arial;'>" + (sysConfig.appendPriceUnit ? "¥" : "") + n["_" + seatOrder[t]] / 10 + "<\/small>") : i.text(n[seatOrder[t]]).css({
                        fontWeight: "bold",
                        color: "#008800"
                    }) : n["_" + seatOrder[t]] && sysConfig.showTicketPrice ? i.html("<span style='font-weight:bold;color:#" + (r.indexOf("无") == -1 ? "008800" : "bbb") + ";'>" + r + "<\/span><br /><small style='font-weight:lighter;color:blue;font-size:10px; font-family: Arial;'>" + (sysConfig.appendPriceUnit ? "¥" : "") + n["_" + seatOrder[t]] / 10 + "<\/small>") : i.text(r).css({
                        fontWeight: "bold",
                        color: "#008800"
                    })
                }
            }))
        })
    })
});
$(document).bind(EVT_ONQUERYPAGE, function() {
    var n;
    $(document).on("processQueryResult", function() {
        var t = $("#gridbox table.obj tr:gt(0)");
        n = {
            raw: null,
            rawTrainMap: {},
            trainMap: {},
            auto: null,
            nextTime: null,
            rowInfo: {}
        };
        t.each(function() {
            var i = $(this),
                c = {
                    row: this,
                    $row: i
                },
                t = {},
                o = i.find("td:eq(0) span.base_txtdiv"),
                f = /onStopHover\(['"](.*?)#(.*?)#(.*?)['"]\)/i.exec(o.attr("onmouseover")),
                r, s, e, h, u;
            t.code = $.trim(o.text());
            t.from = {
                code: f[2] || ""
            };
            t.to = {
                code: f[3] || ""
            };
            t.id = f[1] || "";
            r = $.trim(i.find("td:eq(1)").text()).split(/\s+/);
            t.from.endpoint = i.find("td:eq(1) img").length;
            t.from.name = r[0];
            t.from.time = r[1];
            r = $.trim(i.find("td:eq(2)").text()).split(/\s+/);
            t.to.endpoint = i.find("td:eq(1) img").length;
            t.to.name = r[0];
            t.to.time = r[1];
            t.elapsedTime = {
                total: $.trim(i.find("td:eq(3)").text())
            };
            s = 4;
            t.tickets = {};
            t.price = {};
            i.find("td:gt(3):lt(11)").each(function(n) {
                var f = seatOrder[s + n],
                    u = $(this),
                    e = u.find("span"),
                    i, r;
                e.length ? (i = e.text(), r = $.trim(u.find("small").text())) : (i = $.trim(u.text()), r = "");
                t.tickets[f] = i.indexOf("有") != -1 ? 9999 : i == "*" ? -1 : i == "--" ? -2 : i == "无" ? 0 : parseInt(i);
                r && (t.price[f] = parseInt(r.replace(/\./g, ""), 10))
            });
            i.data("ticketdata") && (e = _.pairs(i.data("ticketdata")), t.price = $.extend(t.price, _.object(_.filter(e, function(n) {
                return n[0][0] === "_"
            }))), t.tickets = $.extend(t.tickets, _.object(_.filter(e, function(n) {
                return n[0][0] !== "_"
            }))));
            i.find(".btn130_2").length ? t.available = 1 : (h = $.trim(i.find("td:eq(15) a").text()), u = /(0*(\d+)月0*(\d+)日)?(\d+)\s*点起售/i.exec(h), u === null ? t.available = 0 : (t.available = -1, t.selltime = new Date, t.selltime.setHours(parseInt(u[4])), t.selltime.setMinutes(0), t.selltime.setSeconds(0), u[1] && (t.selltime.setMonth(parseInt(u[2]) - 1), t.selltime.setDate(parseInt(u[3])), t.selltime.getMonth() < (new Date).getMonth() && t.selltime.setFullYear(t.selltime.getFullYear() + 1))));
            n.trainMap[t.id] = t;
            n.rowInfo[t.id] = c
        });
        n.original = _.values(n.trainMap);
        n.available = n.original;
        n.trainCodes = _.pluck(n.original, "code");
        n.filtered = [];
        n.include = n.available;
        $(document).trigger("filterTrains", n);
        $(document).trigger("processTrains", n)
    });
    (function() {
        $(document).bind("performAutoSubmit", function() {
            n.rowInfo[n.auto.data.id].$row.find("a")[0].click()
        })
    })()
});
$(document).bind(EVT_ONSUBMITPAGE, function() {
    var n = null,
        i = !1,
        r = !1,
        t;
    unsafeInvoke(function() {
        $.fn.query_passenger = function(n) {
            return function() {
                return n.apply(this, $.makeArray(arguments)), document.dispatchEvent(new CustomEvent("query_passenger")), this
            }
        }($.fn.query_passenger);
        document.addEventListener("addp", function() {
            r && ($("a.add_ticket_passenger").click(), r = !0)
        });
        document.addEventListener("sf", function() {
            $("div.tj_btn button:last")[0].click()
        });
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
    t = function() {
        if (n)
            if (log.print(n), $("#showPassengerFilter :checkbox").length) {
                var i = n.auto.passengers;
                $.each(i, function() {
                    var t = $("#" + this.name + this.idtype + this.id + " :checkbox"),
                        n;
                    t.length ? t.click() : (document.dispatchEvent(new CustomEvent("addp")), n = $("table.table_qr tr:visible:not(:last):last"), n.find("td:eq(3) select").val(this.type), n.find("td:eq(4) input").val(this.name), n.find("td:eq(5) select").val(this.idtype), n.find("td:eq(6) input").val(this.id), n.find("td:last :checkbox").prop("checked", this.save))
                });
                $("select[name$=_seat]").val(n.auto.seat === "0" ? "1" : n.auto.seat);
                i && i.length && document.getElementById("rand").focus()
            } else document.addEventListener("query_passenger", function() {
                t()
            })
    };
    msg.on("enableSubmitOrder", function() {
        i = !0;
        $("#rand").keyup()
    });
    $("#rand").keyup(function() {
        i && sysConfig.autoSubmitAfterVerifyCode && this.value.length >= 4 && document.dispatchEvent(new CustomEvent("sf"))
    });
    document.addEventListener("ajax", function(n) {
            var t = n.detail;
            t.url.indexOf("method=getQueueCount") === -1 || sysConfig.dynamicAutoConfirmOrderDelay < 0 || setTimeout(function() {
                for (var t = parent.$("#queue_note").closest(".ui-dialog").find("button"), n = 0; n < t.length; n++) $.trim(t.eq(n).text()).replace(/\s/g, "") === "确定" && t[n].click()
            }, sysConfig.dynamicAutoConfirmOrderDelay)
        }),
        function() {
            var n = {
                date: $("#start_date").val(),
                from: $("#from_station_telecode").val(),
                to: $("#to_station_telecode").val(),
                td: $("#train_no").val(),
                tcode: $("#station_train_code").val(),
                code: ""
            };
            chrome.runtime.sendMessage({
                action: "reportSubmitInfo",
                detail: n
            })
        }();
    chrome.runtime.sendMessage({
        action: "getLastAutoData"
    }, function(i) {
        n = i;
        t()
    })
});
$(document).bind(EVT_ONMAINPAGE, function() {
    var n = location.hash;
    n && setTimeout(function() {
            document.getElementById("main").src = n.substr(1)
        }, 1e3),
        function() {
            var n = null;
            $doc.on("sysConfigUpdated", function() {
                if (sysConfig.keepOnline) log.print("init keep-online timer."), n = setInterval(function() {
                    $.get("/otsweb/")
                }, 6e5);
                else {
                    n && (clearInterval(n), n = null);
                    return
                }
            }).trigger("sysConfigUpdated")
        }()
});
$(document).bind("routePage", function() {
    var n = location.pathname.slice(8),
        i = location.search.slice(1),
        r = !1,
        t = function(n) {
            r = !0;
            chrome.runtime.sendMessage({
                action: "pageInitCall",
                detail: {
                    page: n
                }
            });
            $(document).trigger(n)
        },
        u;
    (n == "loginAction.do" && location.search != "method=initForMy12306" || n == "login.jsp") && ($("#loginForm").length ? t(EVT_ONLOGINPAGE) : $("div.left_m").length && (u = $.trim($("div.left_m").text()), chrome.runtime.sendMessage({
        action: "logTempUserSuccess",
        detail: {
            name: u
        }
    })));
    n == "order/querySingleAction.do" && (i == "method=init" && document.getElementById("submitQuery") ? t(EVT_ONQUERYPAGE) : i == "method=submutOrderRequest");
    (n == "" || n == "main.jsp") && t(EVT_ONMAINPAGE);
    n == "passengerAction.do" && i == "method=initUsualPassenger12306" && t(EVT_ONPASSENGERPAGE);
    (n == "order/confirmPassengerAction.do" || n == "order/confirmPassengerResignAction.do") && i == "method=init" && t(EVT_ONSUBMITPAGE);
    n == "order/orderAction.do" && location.search.indexOf("method=cancelMyOrderNotComplete") != -1 && document.getElementById("submitQuery") && t(EVT_ONQUERYPAGE);
    n == "order/payConfirmOnlineSingleAction.do" && location.search.indexOf("method=cancelOrder") != -1 && document.getElementById("submitQuery") && t(EVT_ONQUERYPAGE);
    n == "order/myOrderAction.do" && i.indexOf("method=resign") != -1 && document.getElementById("submitQuery") && t(EVT_ONQUERYPAGE);
    r || chrome.runtime.sendMessage({
        action: "onUnvalidPage"
    })
})

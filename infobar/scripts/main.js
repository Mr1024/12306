if ($(function() {
        var t = $(document),
            i = !1,
            n = null,
            f, e, r, o, u, s, h;
        $("#seatTypeList label").each(function(n, t) {
            t.dataset.index = n
        });
        $("#addp_search_key").searchDelay().bind("search.fish.searchdelay", function(n, t) {
            t ? ($("#contactList button").hide().filter("[data-key*=" + t + "], [data-fl*=" + t.toUpperCase() + "]").show(), $("#addp_search_clear").prop("disabled", !t)) : ($("#contactList button").show(), $("#addp_search_clear").prop("disabled", !0))
        });
        $("#addp_search_clear").click(function() {
                $("#addp_search_key").val("").searchDelay("search")
            }),
            function() {
                for (var i, f = $("#dateLoopBox"), e = (new Date).trimToDay(), u = [], r = 0; r < 25; r++) i = e.addDays(r), u.push("<button type='button' class='btn btn-primary btn-sm' data-fulldate='" + i.format("yyyy-MM-dd") + "' data-date='" + i.format("MM-dd") + "'>" + i.format("MM-dd") + "<\/button>");
                f.html(u.join(""));
                t.on("click", "#dateLoopContainer button", function() {
                    var i = $(this),
                        t = this.dataset.fulldate;
                    n.currentProfile.dateloop = _.without(n.currentProfile.dateloop, t, null);
                    n.save();
                    i.remove();
                    $("#dateLoop .modal-body button[data-fulldate='" + t + "']").prop("disabled", !1);
                    $("#dateLoopBtn").prop("disabled", !1);
                    message.sendToTab({
                        action: "removeDateLoop",
                        detail: t
                    })
                });
                t.on("click", "#dateLoopBox button", function() {
                    var t = $(this);
                    n.currentProfile.dateloop.push(this.dataset.fulldate);
                    $("#dateLoopContainer").append(t.clone().removeClass("btn-primary").addClass("btn-default"));
                    this.disabled = !0;
                    n.save();
                    $("#dateLoopBtn").prop("disabled", n.currentProfile.dateloop.length >= 5);
                    n.currentProfile.dateloop.length >= 5 && $("#dateLoop").modal("hide");
                    message.sendToTab({
                        action: "addDateLoop",
                        detail: this.dataset.fulldate
                    })
                });
                message.addAction("addDateLoop", function() {
                    $("#dateLoop .modal-body button[data-fulldate='" + this + "']:enabled").click()
                });
                message.addAction("removeDateLoop", function() {
                    $("#dateLoopContainer button[data-fulldate='" + this + "']").click()
                })
            }();
        f = function(t) {
            var i, u;
            t && (i = $("#seatTypeList"), t.selectedSeatType = t.selectedSeatType || [], u = t.selectedSeatType, i.find(":checkbox:checked").each(function() {
                this.checked = !1;
                $(this).change()
            }), $.each(u, function() {
                i.find(":checkbox[value=" + this + "]:not(:checked)").prop("checked", !0).change()
            }), t.selectedSeatType = u, t.selectedTrain = t.selectedTrain || [], $("#trains").val(t.selectedTrain.join(",")).change(), r.importTags(t.selectedTrain.join(",")), n.currentProfile.passengers = n.currentProfile.passengers || [], $("#passengers").html($.map(n.currentProfile.passengers, function(n) {
                return n.toHtml(!0)
            }).join("")), $("#btnAddPassengerD, #btnAddPassengerM").prop("disabled", n.currentProfile.passengers.length >= 5), function() {
                var i = $("#dateLoopContainer"),
                    r = (new Date).trimToDay(),
                    t;
                i.empty();
                $("#dateLoop button").prop("disabled", !1);
                t = [];
                n.currentProfile.dateloop = n.currentProfile.dateloop || [];
                $.each(n.currentProfile.dateloop, function() {
                    var u = new Date(this + "");
                    u >= r && (i.append("<button type='button' class='btn btn-default btn-sm' data-fulldate='" + u.format("yyyy-MM-dd") + "' data-date='" + u.format("MM-dd") + "'>" + u.format("MM-dd") + "<\/button>"), t.push(this + ""));
                    n.currentProfile.dateloop = t;
                    $("#dateLoop button[data-fulldate='" + this + "']").prop("disabled", !0)
                });
                $("#dateLoopBtn").prop("disabled", n.currentProfile.dateloop.length >= 5)
            }(), $("input[data-profile-key], select[data-profile-key]").each(function() {
                var i = this,
                    r = $(this),
                    u = i.type,
                    f = i.dataset.profileKey,
                    e = n.currentProfile,
                    t = e[f];
                typeof t == "boolean" ? u == "radio" ? $("input[name=" + i.name + "][value=" + (t ? 1 : 0) + "]")[0].checked = !0 : u == "checkbox" ? i.checked = t : r.val(t ? "1" : "0") : r.val(t)
            }), message.sendToTab({
                action: "profileChanged",
                detail: JSON.parse(JSON.stringify(t))
            }))
        };
        e = function() {
            if (n) {
                if ($("#contactList").empty(), !n.passengers || !n.passengers.length) {
                    $("#addp_refresh").bsButton("loading");
                    n.reloadPassengers();
                    return
                }
                var t = $.map(n.passengers, function(n) {
                    return n.toHtml()
                });
                $("#contactList").html(t.join("")).find();
                $("#addp_refresh").bsButton("reset");
                $("#addPassenger").trigger("show.bs.modal")
            }
        };
        $("input:checkbox[name=seat]").change(function() {
            var e, f, r, u;
            if (n) {
                var s = $(this),
                    t = s.parent(),
                    o = t.parent();
                if (this.checked) t.addClass("highlight"), e = t.prevAll().find(":checkbox:checked").parent().last(), e.length ? e.after(t) : o.prepend(t), n && i && n.currentProfile.selectedSeatType.push(this.value), i && message.sendActionToTab("addSeat", this.value);
                else {
                    if (f = t[0].dataset.index, r = t.nextAll().find(":checkbox:not(:checked)").parent(), t.removeClass("highlight"), r.length) {
                        if (f > r.last()[0].dataset.index) r.last().after(t);
                        else if (f < r.first()[0].dataset.index) r.first().before(t);
                        else
                            for (u = 1; u < r.length; u++)
                                if (r[u - 1].dataset.index < f && r[u].dataset.index > f) {
                                    r.eq(u - 1).after(t);
                                    break
                                }
                    } else o.append(t);
                    n && i && (n.currentProfile.selectedSeatType = _.without(n.currentProfile.selectedSeatType, this.value));
                    i && message.sendActionToTab("removeSeat", this.value)
                }
                n && i && n.save()
            }
        });
        t.on("click", ".seatCheckLink", function() {
            var i = this.dataset.target,
                t;
            for ($("input:checkbox[name=seat]:checked").each(function() {
                    this.checked = !1;
                    $(this).change()
                }), t = 0; t < i.length; t++) $("input:checkbox[name=seat][value=" + i[t] + "]").prop("checked", !0).change();
            message.sendActionToTab("seatReset", n.currentProfile.selectedSeatType)
        });
        message.addAction("addSeat", function() {
            $("input:checkbox[name=seat][value=" + this + "]:not(:checked)").prop("checked", !0).change()
        });
        message.addAction("removeSeat", function() {
            $("input:checkbox[name=seat][value=" + this + "]:checked").prop("checked", !1).change()
        });
        r = $("#trains").tagsInput({
            height: "20px",
            defaultText: "输入车次",
            removeWithBackspace: !0,
            spacer: ",. |\n",
            width: "100%",
            onChange: function() {
                n && i && (n.currentProfile.selectedTrain = _.filter($("#trains").val().split(","), function(n) {
                    return n
                }), n.save())
            },
            onAddTag: function(n) {
                i && message.sendActionToTab("addTrain", n)
            },
            onRemoveTag: function(n) {
                i && message.sendActionToTab("removeTrain", n)
            },
            autosize: !1,
            onBeforeAdd: function(n) {
                return n ? n.toUpperCase() : ""
            }
        });
        $("#addtrain_ok").click(function() {
            var n = $.trim($("#addtrain_code").val());
            if (n && (n = n.replace(/[\s，,.。-]/g, "|").replace(/[\^\$]/g, "").toUpperCase(), !r.tagExist(n))) {
                try {
                    new RegExp("^" + n + "$")
                } catch (t) {
                    alert("表达式不正确...");
                    return
                }
                r.addTag(n);
                $("#addTrain").modal("hide")
            }
        });
        t.on("click", ".cmd-addtrain", function() {
            r.tagExist(this.dataset.code) || r.addTag(this.dataset.code)
        });
        for (message.addAction("addTrain", function() {
                var n = this + "";
                r.tagExist(n) || r.addTag(n)
            }), message.addAction("removeTrain", function() {
                var n = this + "";
                r.tagExist(n) && r.removeTag(n)
            }), function() {
                t.on("show.bs.modal", "#addPassenger", function() {
                    var i = $("#addPassenger"),
                        t = i.find("[data-key]");
                    t.prop("disabled", !1);
                    t.filter("[data-invalid]").prop("disabled", !0);
                    t.find("i").remove();
                    $.each(n.currentProfile.passengers, function() {
                        t.filter("[data-key='" + this.key + "']").prop("disabled", !0).prepend('<i class="glyphicon glyphicon-ok" style="margin-right:5px;"><\/i>')
                    })
                });
                var i = function(t) {
                        _.findWhere(n.currentProfile.passengers, {
                            key: t.key
                        }) || (n.currentProfile.passengers.push(t), $("#passengers").append(t.toHtml(!0)), $("#btnAddPassengerD, #btnAddPassengerM").prop("disabled", n.currentProfile.passengers.length >= 5), n.save(), message.sendActionToTab("addPassenger", t))
                    },
                    r = function(t) {
                        _.findWhere(n.currentProfile.passengers, {
                            key: t.key
                        }) && (n.currentProfile.passengers = _.without(n.currentProfile.passengers, t), $("#btnAddPassengerD, #btnAddPassengerM").prop("disabled", !1), n.save(), message.sendActionToTab("removePassenger", t))
                    };
                t.on("click", "#addPassenger button[data-key]", function() {
                    if (n.currentProfile.passengers.length >= 5) {
                        alert("亲，联系人最多只能选择五个哦。");
                        $("#addPassenger").modal("hide");
                        return
                    }
                    this.disabled = !0;
                    $(this).prepend('<i class="glyphicon glyphicon-ok" style="margin-right:5px;"><\/i>');
                    var t = this.dataset.key,
                        r = _.findWhere(n.passengers, {
                            key: t
                        });
                    i(r);
                    n.currentProfile.passengers.length >= 5 && $("#addPassenger").modal("hide")
                });
                t.on("click", "#passengers button[data-key]", function() {
                    var t = this.dataset.key,
                        i = $(this);
                    i.remove();
                    r(_.findWhere(n.currentProfile.passengers, {
                        key: t
                    }))
                });
                $("#addmp_ok").click(function() {
                    var o, f;
                    if (n.currentProfile.passengers.length >= 5) {
                        alert("亲，联系人最多只能选择五个哦。");
                        $("#enterPassenger").modal("hide");
                        return
                    }
                    var t = $("#addmp_idtype").val(),
                        r = $("#addmp_id").val(),
                        u = $("#addmp_name").val(),
                        e = $("#addmp_tickettype").val();
                    if (!u || !r) {
                        alert("咦，名字或证件号没写....");
                        return
                    }
                    if (o = _.findWhere(n.currentProfile.passengers, {
                            name: u,
                            idtype: t,
                            id: r
                        }), o) {
                        alert("这位客官，同名同证件号的乘客已经添加过了哦。。");
                        return
                    }
                    f = new Passenger(u, e, passengerTypeCode[e], t, idTypeCode[t], r, "");
                    f.save = !1;
                    i(f);
                    $("#enterPassenger").modal("hide")
                });
                message.addAction("addPassenger", function() {
                    var t = _.findWhere(n.passengers, {
                        name: this.name,
                        typename: this.typename,
                        id: this.id
                    });
                    t && i(t)
                });
                message.addAction("removePassenger", function() {
                    var t = _.findWhere(n.passengers, {
                        name: this.name,
                        typename: this.typename,
                        id: this.id
                    });
                    t && $("#passengers button[data-key='" + t.key + "']").click()
                })
            }(), o = $("#timerangeContainer select"), u = 0; u < 24; u++) s = (u < 10 ? "0" : "") + u, o.each(function() {
            this.options[u] = new Option(s + ":" + (this.dataset.isend ? "59" : "00"), u)
        });
        (function() {
            t.on("change", "[data-profile-key]", function() {
                if (n) {
                    var t = this,
                        f = $(this),
                        e = t.type,
                        r = t.dataset.profileKey,
                        u = n.currentProfile,
                        o = u[r];
                    u[r] = typeof o == "boolean" ? e == "radio" ? $("input[name=" + t.name + "]:checked")[0].value == "1" : e == "checkbox" ? t.checked : f.val() == "1" : typeof o == "number" ? parseInt(f.val() + "") : $.trim(f.val());
                    u.save();
                    i && message.sendActionToTab("miscChanged", {
                        key: r,
                        value: u[r]
                    })
                }
            });
            t.on("change", "[data-sysconfigkey]", function() {
                if (sysConfig) {
                    var n = this,
                        r = $(this),
                        t = n.type,
                        u = n.dataset.sysconfigkey,
                        i = {};
                    i[u] = t == "radio" ? $("input[name=" + n.name + "]:checked")[0].value == "1" : t == "checkbox" ? n.checked : $.trim(r.val());
                    message.sendAction("setUserConfig", i)
                }
            });
            message.addAction("miscChanged", function() {
                var n = $("[data-profile-key='" + this.key + "']"),
                    t, i;
                if (n.length) {
                    if (i = n.attr("type"), typeof this.value == "boolean")
                        if (i === "radio") {
                            if (t = $("input[name=" + n[0].name + "][value=" + (this.value ? 1 : 0) + "]")[0], t.checked === this.value) return;
                            t.checked = this.value
                        } else if (i === "checkbox") {
                        if (n[0].checked === this.value) return;
                        n[0].checked = this.value
                    } else {
                        if (n.val() == this.value) return;
                        n.val(this.value ? "1" : "0")
                    } else {
                        if (n.val() == this.value) return;
                        n.val(this.value)
                    }
                    n.change()
                }
            })
        })();
        $("#cmdSaveTravelMethod").click(function() {
            message.sendToTab({
                action: "getStationInfo"
            }, function(t) {
                var i = t.detail,
                    u, r, f;
                if (!i || !i.fromCode || !i.toCode) {
                    alert("您还木有选择出发地目标地和出发时间呢。。。");
                    return
                }($.extend(n.currentProfile, i), u = prompt("请输入新的出行计划的名称（如果名称已经存在，则会被覆盖）：", i.fromText + "--" + i.toText), u) && ($("#historyList button").each(function() {
                    if ($(this).text() == u) {
                        var t = $(this).closest(".btn-group");
                        return n.savedProfile.remove(t.data("travel")), t.removeData("travel"), t.remove(), !1
                    }
                }), r = new Profile(n.currentProfile), r.name = u, n.savedProfile.add(r), f = $('<div class="btn-group"><button class="btn btn-info btn-sm">' + r.name + '<\/button><button class="btn btn-sm btn-danger" data-cmd="deleteTravelWay"><i class="glyphicon glyphicon-remove"><\/i><\/button><\/div>'), f.data("travel", r), $("#historyList").append(f), notification.create({
                    iconUrl: LARGEICON,
                    message: "出行计划已保存~",
                    title: "订票助手"
                }))
            })
        });
        t.on("click", "button[data-cmd=deleteTravelWay]", function() {
            var t = $(this).closest(".btn-group"),
                i = t.find("button:first").text();
            confirm("确定要删除出行计划【" + i + "】吗？") && (n.savedProfile.remove(t.data("travel")), t.removeData("travel"), t.remove())
        });
        t.on("click", "#historyList button.btn-info", function() {
            var i = $(this),
                r = $.trim(i.text()),
                t = _.findWhere(n.savedProfile.list, {
                    name: r
                });
            n.resetCurrentProfile(t);
            f(n.currentProfile);
            message.sendActionToTab("profileReload", t);
            $("#travelHistory").modal("hide")
        });
        $("#btnResetProfile").click(function() {
            n && (n.currentProfile.reset(), f(n.currentProfile), n.save())
        });
        $("#addp_refresh").click(function() {
            n && !this.disabled && (n.passengers = [], e())
        });
        n && (f(n.currentProfile), e());
        h = function(t) {
                if (i = !1, t) {
                    n = t;
                    f(t.currentProfile);
                    e();
                    var r = $("#historyList");
                    r.empty();
                    $.each(n.savedProfile.list, function() {
                        var t = this,
                            n = $('<div class="btn-group"><button class="btn btn-info btn-sm">' + t.name + '<\/button><button class="btn btn-sm btn-danger" data-cmd="deleteTravelWay"><i class="glyphicon glyphicon-remove"><\/i><\/button><\/div>');
                        n.data("travel", this);
                        r.append(n)
                    });
                    n.on("passengerLoaded", function() {
                        e()
                    });
                    n.on("userSaved", function() {
                        message.sendToTab({
                            action: "profileChanged",
                            detail: JSON.parse(JSON.stringify(n.currentProfile))
                        })
                    });
                    i = !0
                }
            },
            function() {
                message.addAction("stationInfoUpdate", function() {
                    n && ($.extend(n.currentProfile, this), n.save())
                });
                message.addAction("getCurrentProfile", function(t) {
                    n && t({
                        detail: JSON.parse(JSON.stringify(n.currentProfile))
                    })
                });
                message.addAction("getCurrentUser", function(t) {
                    n && t({
                        detail: JSON.parse(JSON.stringify(n))
                    })
                });
                message.addAction("passengerUpdated", function() {
                    n.reloadPassengers(this)
                });
                message.addAction("userOptionChanged", function() {
                    n.options = $.extend(n.options, this);
                    n.save()
                });
                message.addAction("setResignMode", function() {
                    var t = this;
                    t.profile ? (n.currentProfile = $.extend(n.currentProfile, t.profile), $("input:checkbox[name=optStudent]").prop("disabled", !0)) : $("input:checkbox[name=optStudent]").prop("disabled", !1)
                })
            }(),
            function() {
                var t = $("#queryStat"),
                    i = 0,
                    u = null,
                    f = null,
                    e = new Date < new Date("2014-01-25 00:00:00"),
                    o = new Date < new Date("2014-02-15 00:00:00"),
                    r = !1,
                    s = function(n, t) {
                        if (!e || r || n.indexOf("北京") === -1) return !1;
                        return _.some(["呼和浩特", "太原", "菏泽", "大连", "合肥", "南京", "武汉"], function(n) {
                            return t.indexOf(n) !== -1
                        })
                    },
                    h = function() {
                        return !o || r ? !1 : !0
                    };
                message.addAction("queryStatisticsReport", function() {
                    u = this;
                    var e = this.stat,
                        r = n.currentProfile;
                    f !== r.fromCode + r.toCode && (i = 0, f = r.fromCode + r.toCode);
                    i++;
                    t.css("visibility", "visible");
                    t.find("span:eq(0)").html("第 " + i + " 次查票");
                    this.failed ? (t.find("span:eq(1)").html("查询失败"), t.find("span:eq(2)").html("查询失败")) : (t.find("span:eq(1)").html("" + e.original.length + " 趟车"), t.find("span:eq(2)").html(e.filtered.length + " 趟车过滤"));
                    $("#btnRefresh.btn-success, #btnRefresh.btn-info").length && chrome.extension.sendMessage({
                        ticketEvent: "refresh",
                        times: i
                    })
                });
                $("#bus a:last").click(function() {
                    r = !0;
                    $(this).parent().hide()
                });
                $(document).on("show.bs.modal", "#queryResult", function() {
                    var i = $("#queryResult .modal-body"),
                        t = [],
                        n = function(n, i) {
                            var r = _.where(u.stat.filtered, {
                                reason: n
                            });
                            r.length && t.push("<strong>" + i + "<\/strong>：" + _.map(r, function(n) {
                                return n.code
                            }).join("; "))
                        };
                    n(1, "　因无票被过滤");
                    n(2, "因发站不同过滤");
                    n(3, "因到站不同过滤");
                    n(4, "时间不对被过滤");
                    n(5, "非预定车次过滤");
                    t.length || t.push("<em>没有车次被过滤<\/em>");
                    i.html(t.join("<br />"))
                })
            }(),
            function() {
                var t = $("#btnRefresh"),
                    f = t.find("i"),
                    e = t.find("span"),
                    r = null,
                    u, i;
                localStorage.removeItem("lastStatics");
                message.addAction("pageInitCall", function() {
                    t.hasClass("btn-primary") || t.click()
                });
                var h = function(n) {
                        return n = n / 10 + "", n.indexOf(".") == -1 ? n + ".0" : n
                    },
                    a = function() {
                        u--;
                        u <= 0 ? c() : $("#stopTimer").text(h(u) + "秒后重查")
                    },
                    o = !1,
                    c = function() {
                        var r, s, i, u;
                        o = !0;
                        l();
                        s = t.hasClass("btn-success");
                        s && n.currentProfile.dateloop && n.currentProfile.dateloop.length ? (i = $("#dateLoopContainer button.btn-primary"), i.length ? (u = i.next(), i.removeClass("btn-primary"), u.length ? (r = u[0].dataset.fulldate, u.addClass("btn-primary")) : r = n.currentProfile.depDate) : (i = $("#dateLoopContainer button:first"), r = i[0].dataset.fulldate, i.addClass("btn-primary"))) : message.sendToTab({
                            action: "getStationInfo"
                        }, function(i) {
                            var u = i.detail;
                            $.extend(n.currentProfile, u);
                            t.removeClass("btn-primary").addClass("btn-success");
                            r = n.currentProfile.depDate
                        });
                        e.text("正在查询");
                        f.removeClass().addClass("glyphicon glyphicon-flash");
                        $("#stopTimer").hide();
                        message.sendToTab({
                            action: "startQuery",
                            detail: {
                                date: r,
                                byAuto: s
                            }
                        }, function(n) {
                            n.canquery || t.click();
                            n.sysAuto && (e.text("系统刷新中"), t.removeClass("btn-success").addClass("btn-info"), f.removeClass().addClass("glyphicon glyphicon-dashboard"))
                        })
                    },
                    s = function() {
                        l();
                        t.removeClass("btn-success btn-info").addClass("btn-primary");
                        $("#dateLoopContainer button").removeClass("btn-primary");
                        e.text("开始刷票");
                        $("#stopTimer").hide();
                        f.removeClass().addClass("glyphicon glyphicon-refresh");
                        message.sendToTab({
                            action: "profileChanged",
                            detail: JSON.parse(JSON.stringify(n.currentProfile))
                        })
                    },
                    l = function() {
                        r !== null && (clearInterval(r), r = null)
                    };
                t.click(function() {
                    if ($(".btnMute").click(), t.hasClass("btn-success")) s();
                    else if (t.hasClass("btn-info")) s(), message.sendActionToTab("stopQuery");
                    else {
                        var i = n.currentProfile;
                        message.sendAction("track", {
                            type: 95,
                            values: [i.fromCode, i.fromText, i.toCode, i.toText, i.depDate, i.passengers && Passenger.length || 0, i.selectedTrain && i.selectedTrain.length || 0, i.selectedSeatType && i.selectedSeatType.length || 0, i.dateloop && i.dateloop.length || 0, i.autoSubmitEnabled, i.partialSubmitEnabled, i.studentTicket]
                        });
                        c()
                    }
                });
                t.hasClass("btn-primary") || t.click();
                message.addAction("autoSubmitOrder", function() {
                    var t = n.currentProfile;
                    message.sendAction("track", {
                        type: 86,
                        values: [t.fromCode, t.fromText, t.toCode, t.toText, t.depDate, t.passengers && Passenger.length || 0, t.selectedTrain && t.selectedTrain.length || 0, t.selectedSeatType && t.selectedSeatType.length || 0, t.dateloop && t.dateloop.length || 0, t.autoSubmitEnabled, t.partialSubmitEnabled, t.studentTicket]
                    })
                });
                message.addAction("queryStatisticsReport", function() {
                    if (o || this.failed === !0) {
                        if (o = !1, i = this, localStorage.lastStatics = JSON.stringify(this), i.auto) {
                            t.click();
                            $(document).trigger("ticketAvailable", i.auto);
                            return
                        }
                        i.nextTime > 0 && (!t.hasClass("btn-info") || i.failed) && (u = Math.round(i.nextTime * 10), $("#stopTimer").text(h(u) + "秒后重查"), $("#stopTimer").show(), e.text("停止查询"), t.removeClass().addClass("btn btn-success"), f.removeClass().addClass("glyphicon glyphicon-time"), r && clearInterval(r), r = setInterval(a, 100))
                    }
                });
                message.addAction("checkAutoRefreshEnabled", function(n) {
                    n({
                        enabled: t.hasClass("btn-success")
                    })
                });
                message.addAction("getLastAutoData", function(n) {
                    if (i) n(i);
                    else {
                        var t = localStorage.lastStatics;
                        t ? n(JSON.parse(t)) : n(null)
                    }
                });
                message.addAction("queryStop", function() {
                    $.extend(n.currentProfile, this);
                    s()
                })
            }();
        t.on("currentUserChange", function(t, i) {
            if (!i) {
                if (n && n.username === sessionStorage["12306_sessionuser"]) return;
                if (sessionStorage["12306_sessionuser"]) i = new LoginUser(sessionStorage["12306_sessionuser"]);
                else return
            }
            h(i)
        })
    }), $(function() {
        var n = new Audio("http://static.liebao.cn/resources/audio/music2.ogg");
        $(document).on("ticketAvailable", function(t, i) {
            sysConfig.enableSoundPrompt && ($(".btnMute").show(), n.loop = !0, n.play());
            sysConfig.enablePopupPrompt && notification.create({
                iconUrl: "/icons/icon_128.png",
                title: "订票助手",
                message: "主公，查到车次：" + i.train + " " + seatTypeFull[i.seat] + "，快灰来订票啊！"
            });
            message.sendAction("attention", {
                tabid: message.tab.id,
                windowid: message.tab.windowId
            })
        });
        $(".btnMute").click(function() {
            n.pause();
            $(".btnMute").hide()
        })
    }), $(function() {
        (function() {
            var n = 0,
                i = null,
                t = null;
            message.addAction("pageInitCall", function() {
                (t && (clearInterval(t), t = null), this.page == "onSubmitPage") && (n = (ISOTN ? sysConfig.otnAutoSubmitOrderDelay : sysConfig.dynamicAutoSubmitOrderDelay) / 100, i = $("#countDown").removeClass("label-success").addClass("label-warning").html("请等待 <em>" + n / 100 + "<\/em> 秒再提交订单").find("em"), n > 0 ? t = setInterval(function() {
                    if (n -= 1, n > 0) {
                        var r = n / 10 + "";
                        i.html(r + (r.length < 2 ? ".0" : ""))
                    } else i.parent().removeClass("label-warning").addClass("label-success").html("可以提交订单了哦"), clearInterval(t), t = null, message.sendToTab({
                        action: "enableSubmitOrder"
                    })
                }, 100) : (i.parent().removeClass("label-warning").addClass("label-success").html("可以提交订单了哦"), message.sendToTab({
                    action: "enableSubmitOrder"
                })))
            })
        })(),
        function() {
            var t = null,
                n = null;
            message.addAction("reportSubmitInfo", function() {
                i();
                n = this;
                message.sendAction("track", {
                    type: 96,
                    values: [n.from, n.to, n.date, 0, n.td, n.code || ""]
                });
                r()
            });
            message.addAction("sysConfigUpdate", function() {
                $(".rtp:visible").length && r()
            });
            message.addAction("pageInitCall", function() {
                i()
            });
            var i = function() {
                    t && (clearInterval(t), t = null)
                },
                r = function() {
                    if (i(), !sysConfig.enableRealTimeTicketQuery) {
                        $(".rtp").find("span").remove().append("<span class='label label-normal label-danger'>实时余票查询已被自动关闭<\/span>");
                        return
                    }
                    n && (t = setInterval(u, 1e4), u())
                },
                u = function() {
                    otsweb.queryTicket(n.from, n.to, n.date, n.td, n.code, function(n) {
                        if (n) {
                            var t = [];
                            $.each(n, function(n, i) {
                                n[0] != "_" && i !== -2 && seatType[n] && (t.push("<span class='label label-normal label-" + (i > 0 ? "primary" : "default") + "'>"), t.push(seatType[n]), t.push(" "), i == -1 ? t.push("未售") : i == 9999 ? t.push("大量") : i > 0 ? t.push(i + "张") : t.push("无"), t.push("<\/span> "))
                            });
                            $(".rtp").find("span").remove().end().append(t.join(""))
                        } else $(".rtp").find("span").remove().end().append('<span class="label label-danger label-normal">警告：车次已无票<\/label>')
                    })
                }
        }()
    }), $(function() {
        var n = null,
            t;
        localStorage.tempuser && (n = JSON.parse(localStorage.tempuser));
        message.addAction("logTempUser", function() {
            n = this;
            localStorage.tempuser = JSON.stringify(this)
        });
        message.addAction("logTempUserSuccess", function() {
            if (n) {
                message.sendAction("track", {
                    type: 93
                });
                var r = this.name,
                    i = new LoginUser(n.tempUser);
                sessionStorage["12306_sessionuser"] = n.tempUser;
                i.dispname = r;
                i.save();
                USERS.add(n.tempUser, r, sysConfig.rememberLoginPwd ? n.tempPwd : "");
                localStorage.setItem("12306_lastUser", JSON.stringify({
                    name: n.tempUser,
                    pwd: sysConfig.rememberLoginPwd ? n.tempPwd : ""
                }));
                sessionStorage.setItem("12306_sessionuser", n.tempUser);
                t();
                $(document).trigger("currentUserChange", i)
            }
        });
        message.addAction("getLastUser", function(n) {
            if (localStorage["12306_lastUser"]) {
                var t = JSON.parse(localStorage["12306_lastUser"]);
                n({
                    name: t.name,
                    pwd: t.pwd
                })
            }
        });
        t = function() {
            $("#userSelect option").remove();
            var n = document.getElementById("userSelect");
            _.size(USERS.list) > 0 ? (n.options[n.options.length] = new Option("请选择", ""), $.each(USERS.list, function(t) {
                n.options[n.options.length] = new Option(this.dispname, t)
            })) : n.options[n.options.length] = new Option("还没有记录...", "")
        };
        t();
        $("#userSelect").change(function() {
            var n = $(this).val(),
                t;
            n && (t = USERS.find(n), t) && message.sendToTab({
                action: "fillUserInfo",
                detail: {
                    name: n,
                    pwd: t.password
                }
            })
        });
        $("#deleteUser").click(function() {
                var n = $("#userSelect").val(),
                    i;
                n && (i = USERS.find(n), confirm("确定要删除已经记录的用户【" + i.dispname + "】吗？所有的相关设置（如出行计划等）都将会被删除。") && (USERS.remove(n), t()))
            }),
            function() {
                var n = (new Date).trimToDay(),
                    t = n.addDays(19);
                $("#presellTip").html(n.format("MM月dd日") + " ~ " + t.format("MM月dd日"))
            }()
    }), function() {
        var n = function(n) {
            var i = $(".containerWraper > div"),
                r = i.filter(".current"),
                t = i.filter("#" + n);
            r.attr("id") != n && t.length && (r.addClass("slideOut").removeClass("current"), t.removeClass("slideOut").addClass("current"), t[0].dataset.hidelogo ? $("#mainWrapper").addClass("nologo") : $("#mainWrapper").removeClass("nologo"))
        };
        message.addAction("pageInitCall", function() {
            var t = this.page;
            if (t != "onMainPage") {
                if (message.sendAction("track", {
                        type: 94,
                        values: [t]
                    }), this.username && (sessionStorage["12306_sessionuser"] = this.username), $(".special").hide(), t === "onLoginPage") {
                    $(".btnMute").click();
                    $(".loginPageOnly, .preSellTip").show();
                    localStorage["12306_lastUser"] && $("#userSelect").val(JSON.parse(localStorage["12306_lastUser"]).name);
                    n("loginPage");
                    return
                }
                if (ISOTN && !this.logined) {
                    $(".btnMute").click();
                    $(".notLoginTip").show();
                    n("loginPage");
                    return
                }
                t === "onQueryPage" ? (localStorage.query_usageTip || (localStorage.query_usageTip = "1", notification.create({
                    iconUrl: "/icons/icon_128.png",
                    title: "欢迎使用~",
                    message: "订票助手增强并扩展了系统的刷票功能。不出意外的话，您可以完全用不到系统的更多选项区域了，助手会帮你直接设置好的，只需要在最上方的助手工具区设置即可。"
                })), $(".btnMute").click(), $("#queryStat").css("visibility", "hidden"), $(document).trigger("currentUserChange"), n("queryPage")) : t === "onSubmitPage" ? ($(document).trigger("currentUserChange"), n("loginPage"), $(".submitPageOnly").show()) : t === "onMainPage"
            }
        });
        message.addAction("onUnvalidPage", function() {
            $(".special").hide();
            $(".preSellTip").show();
            $(".unvalid").show();
            n("loginPage")
        })
    }(), function() {
        var t = setTimeout(function() {
                notification.create({
                    iconUrl: "/icons/icon_128.png",
                    title: "订票助手好像没有正常启动",
                    message: "看起来好像订票助手没有启动。建议您重新打开浏览器。"
                })
            }, 3e3),
            n;
        message.sendAction("servervalid", null, function(n) {
            if (clearTimeout(t), n.valid <= 0) $("#chkEnableSmartDns").parent().hide(), $("#curServerSpeed").parent().remove();
            else {
                var i = function() {
                    chrome.runtime.sendMessage({
                        action: "getCurrentServer"
                    }, function(n) {
                        var i = ISOTN ? n["kyfw.12306.cn"] : n["dynamic.12306.cn"],
                            t = i.speed,
                            r = t === 0 ? "label-default" : t < 0 ? "label-danger" : t < 100 ? "label-success" : t < 400 ? "label-warning" : "label-danger";
                        $("#curServerSpeed").removeClass().addClass("label label-normal " + r).html(t > 0 ? t + " 毫秒" + (i.rate ? " (加速" + i.rate + "%)" : "") : t < 0 ? "无法连接" : "正在帮你测速...")
                    })
                };
                i();
                setInterval(i, 3e3)
            }
        });
        message.addAction("serverStateChange", function(n) {
            var t = n.state;
            t === 1 ? $("#curServerSpeed").html("正在更新节点列表...") : t === 2 ? $("#curServerSpeed").html("正在为您测速...") : t === 3 && $("#curServerSpeed").html("正在准备备用节点...")
        });
        n = function() {
            $("#chkEnableSmartDns")[0].checked = sysConfig.enableServerAutoChange;
            sysConfig.enableServerAutoChange ? $("#curServerSpeed").parent().show() : $("#curServerSpeed").parent().hide();
            $("input[data-sysconfigkey], select[data-sysconfigkey]").each(function() {
                var t = this,
                    i = $(this),
                    r = t.type,
                    u = t.dataset.sysconfigkey,
                    f = sysConfig,
                    n = f[u];
                typeof n == "boolean" ? r == "radio" ? $("input[name=" + t.name + "][value=" + (n ? 1 : 0) + "]")[0].checked = !0 : r == "checkbox" ? t.checked = n : i.val(n ? "1" : "0") : i.val(n)
            })
        };
        $(document).on("sysConfigUpdated", function() {
            n()
        });
        sysConfig && n();
        $("#chkEnableSmartDns").change(function() {
            message.sendAction("setUserConfig", {
                enableServerAutoChange: this.checked
            });
            this.checked ? $("#curServerSpeed").parent().show() : $("#curServerSpeed").parent().hide()
        })
    }(), $(function() {
        var n, t = !1,
            i = function() {
                if (n.hasUpdate) {
                    log.print("nv-" + n.version);
                    var i = $("#updateAvailable").show().find("a");
                    i.attr("title", "最新版：" + n.version);
                    n.url && i.attr("href", n.url);
                    t || (t = !0, notification.create({
                        title: "很高兴地告诉你有新版咯",
                        message: "订票助手新版本发布：" + n.version + "，建议立刻收到碗里去哦。切记多手准备不要全靠哪个渠道买票哦。难道你忘记了大明湖畔的电话订票了吗~~",
                        buttons: [{
                            title: "点击这里立刻更新",
                            iconUrl: "/infobar/theme/plus_16.png",
                            onClick: function() {
                                chrome.tabs.create({
                                    url: n.url
                                })
                            }
                        }]
                    }))
                } else $("#updateAvailable").hide();
                $("#systemNotification").html(n.notify || "暂无通知")
            };
        message.sendAction("getUpdateInfo", null, function(t) {
            n = t;
            i()
        });
        message.addAction("updateInfoRefreshed", function() {
            n = this;
            i()
        });
        message.sendAction("triggerUpdate");
        message.addAction("isAlive", function(n) {
            n(!0)
        })
    }), NONINFOBARMODE) {
    $("body").addClass("iframemode");
    var url = "https://kyfw.12306.cn/otn/leftTicket/init";
    document.write('<div id="iframewrapper"><iframe src="' + url + '" frameborder="0" height="100%" width="100%"><\/iframe><\/div>')
}(function() {
    $("#lnkGoAdv").click(function() {
        chrome.tabs.getSelected(function(n) {
            chrome.tabs.update(n.id, {
                url: "http://12306.liebao.cn/"
            })
        })
    })
})();
$(function() {
    message.addAction("isReady", function(n) {
        n({
            ready: !0
        })
    });
    message.sendAction("track", {
        type: 98
    })
})

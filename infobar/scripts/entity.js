function EventObject() {
    var n = this;
    return this.handles = {}, this.on = function(t, i) {
        var r = n.handles[t] || [];
        n.handles[t] = r;
        r.push(i)
    }, this.off = function(t, i) {
        var r = n.handles[t] || [],
            u;
        if (i)
            for (u = r.length - 1; u >= 0; u++) r[u] == i && r.splice(u, 1);
        else r.length = 0;
        n.handles[t] = r
    }, this.fireEvent = function(t, i) {
        var r = n.handles[t],
            f, u;
        if (r)
            for (f in r)
                if ((u = r[f], u) && u.apply(this, i) === !1) break
    }, this
}

function Profile(n) {
    var t = this,
        i;
    return this.name = "当前模式", this.reset = function() {
        t.selectedSeatType = ["O", "3", "1"];
        t.selectedTrain = [];
        t.selectSeatFirst = !0;
        t.hideNotInListTrain = !1;
        t.hideNoTicket = !1;
        t.hideNotSameFrom = !1;
        t.hideNotSameTo = !1;
        t.autoWaitToSell = !0;
        t.timeRangeDepFrom = 0;
        t.timeRangeDepTo = 23;
        t.timeRangeArrFrom = 0;
        t.timeRangeArrTo = 23;
        t.passengers = [];
        t.dateloop = [];
        t.partialSubmitEnabled = !1;
        t.autoRefreshDelay = null;
        t.autoSubmitEnabled = !1;
        t.studentTicket = !1;
        t.fromText = "";
        t.toText = "";
        t.fromCode = "";
        t.toCode = "";
        t.depDate = ""
    }, t.reset(), this.save = function() {
        t.fireEvent("requireSave")
    }, n && ($.extend(this, _.omit(n, "passengers", "selectedSeatType", "selectedTrain", "dateloop")), i = ["selectedSeatType", "selectedTrain", "dateloop"], _.each(i, function(i) {
        var r = i + "";
        t[r] = _.clone(n[r])
    }), n.passengers && n.passengers.every(function(n) {
        return n.times > 0
    }) && $.each(n.passengers, function() {
        t.passengers.push(new Passenger(this.name, this.type, this.typename, this.idtype, this.idtypeName, this.id, this.firstLetter, this.times))
    })), this
}

function ProfileList(n) {
    var t = this;
    return this.list = [], this.add = function(n) {
        if (n && n instanceof Profile) {
            n.on("requireSave", function() {
                t.save()
            });
            t.list.push(n);
            t.fireEvent("added", [n]);
            t.save()
        }
    }, this.remove = function(n) {
        var i = t.list.indexOf(n);
        i != -1 && (t.list.splice(i, 1), t.fireEvent("removed", [n]), t.save())
    }, this.save = function() {
        t.fireEvent("requireSave")
    }, this.find = function(n) {
        return _.find(t.list, function(t) {
            return t.name == n
        })
    }, n && $.each(n, function() {
        t.list.push(new Profile(this))
    }), this
}

function Passenger(n, t, i, r, u, f, e, o) {
    this.name = n;
    this.type = t;
    this.idtype = r;
    this.id = f;
    this.key = t + "$" + n + "$" + r + "$" + this.id;
    this.save = !1;
    this.firstLetter = e;
    this.idtypeName = u;
    this.typename = i;
    this.times = o;
    var s = this;
    return this.toString = function() {
        return n
    }, this.toHtml = function(n) {
        return "<button type='button' " + (s.canOrder ? "" : "data-invalid='1' title='未通过12306实名校验，无法订票'") + " data-key='" + s.key + "' data-fl='" + s.firstLetter + "' class='btn btn-sm " + (n ? "btn-default" : "btn-primary") + "'>" + s.name + (s.type == 2 ? "<span style='margin-left:3px;color:#" + (n ? "888" : "ccc") + ";'>[童]<\/span>" : s.type == 3 ? "<span style='margin-left:3px;color:#" + (n ? "888" : "ccc") + ";'>[学]<\/span>" : "") + (n ? "" : "") + "<\/button>"
    }, this.toRawPassenger = function() {
        return {
            passenger_name: s.name,
            passenger_type: s.type,
            passenger_id_type_code: s.idtype,
            passenger_id_no: s.id,
            passenger_first_letter: s.firstLetter,
            mobile_no: "",
            passenger_id_type_name: s.idtypeName,
            passenger_type_name: s.typename
        }
    }, Object.defineProperty(this, "canOrder", {
        get: function() {
            return s.idtype === "C" || s.idtype === "G" || s.idtype === "B" ? !0 : s.idtype === "2" ? !1 : s.times == "93" || s.times == "95" || s.times == "97" || s.times == "99"
        }
    }), this
}

function LoginUser(n) {
    var t = this,
        r = "12306_user_" + n,
        i;
    this.username = n || "";
    this.dispname = n || "";
    this.passengers = [];
    this.savedProfile = new ProfileList;
    this.currentProfile = null;
    this.rawPassenger = [];
    this.options = {
        showMore: !1
    };
    this.save = function() {
        localStorage[r] = JSON.stringify(t);
        t.fireEvent("userSaved")
    };
    window.localStorage[r] && (i = JSON.parse(window.localStorage[r]), $.extend(t, _.omit(i, "savedProfile", "passengers", "currentProfile")), t.savedProfile = new ProfileList(i.savedProfile.list), t.currentProfile = new Profile(i.currentProfile), i.passengers && i.passengers.every(function(n) {
        return n.times > 0
    }) && $.each(i.passengers, function() {
        t.passengers.push(new Passenger(this.name, this.type, this.typename, this.idtype, this.idtypeName, this.id, this.firstLetter, this.times))
    }));
    this.reloadPassengers = function(n) {
        t.passengers = [];
        t.rawPassenger = n || [];
        ISOTN ? n ? ($.each(n, function() {
            t.passengers.push(new Passenger(this.passenger_name, this.passenger_type, this.passenger_type_name, this.passenger_id_type_code, this.passenger_id_type_name, this.passenger_id_no, this.first_letter, this.total_times))
        }), t.fireEvent("passengerLoaded"), t.save()) : t.reloadPassengersOtn() : t.reloadPassengersOld()
    };
    this.reloadPassengersOtn = function() {
        otsweb.ajaxGet(message.host + "otn/confirmPassenger/getPassengerDTOs", message.host + "otn/leftTicket/init", null, "json").done(function(n) {
            n.status ? ($.each(n.data.normal_passengers, function() {
                t.rawPassenger.push(this);
                t.passengers.push(new Passenger(this.passenger_name, this.passenger_type, this.passenger_type_name, this.passenger_id_type_code, this.passenger_id_type_name, this.passenger_id_no, this.first_letter, this.total_times))
            }), t.fireEvent("passengerLoaded"), t.save()) : alert("联系人加载失败，请重试。")
        }).fail(function() {
            alert("联系人加载失败，请重试。")
        })
    };
    this.reloadPassengersOld = function() {
        var i = 0,
            r = function() {
                otsweb.ajaxGet("loginAction.do?method=initForMy12306", "loginAction.do?method=initForMy12306", null, "text", function() {
                    setTimeout(function() {
                        otsweb.ajaxGet("passengerAction.do?method=initUsualPassenger12306", "loginAction.do?method=initForMy12306", null, "text", function() {
                            setTimeout(n, 1e3)
                        })
                    }, 1e3)
                })
            },
            n = function() {
                otsweb.ajaxPost("passengerAction.do?method=getPagePassengerAll", "passengerAction.do?method=initUsualPassenger12306", {
                    pageSize: 10,
                    pageIndex: i
                }, "json", function(r) {
                    $.each(r.rows, function() {
                        t.rawPassenger.push(this);
                        t.passengers.push(new Passenger(this.passenger_name, this.passenger_type, this.passenger_type_name, this.passenger_id_type_code, this.passenger_id_type_name, this.passenger_id_no, this.first_letter, this.total_times))
                    });
                    t.passengers.length >= r.recordCount ? (t.fireEvent("passengerLoaded"), t.save()) : (i++, setTimeout(n, 1e3))
                }, function(t) {
                    t.status == 200 ? alert("联系人加载失败，请刷新当前页面重试。") : setTimeout(n, 2e3)
                })
            };
        r()
    };
    this.savedProfile.on("requireSave", t.save);
    return this.resetCurrentProfile = function(n) {
        t.currentProfile = n ? new Profile(n) : t.currentProfile || new Profile;
        t.currentProfile.on("requireSave", t.save)
    }, this.resetCurrentProfile(), this
}
var passengerTypeCode = {
        "1": "成人",
        "2": "儿童",
        "3": "学生",
        "4": "残疾军人、伤残人民警察"
    },
    idTypeCode = {
        "1": "二代身份证",
        "2": "一代身份证",
        C: "港澳通行证",
        G: "台湾通行证",
        B: "护照"
    },
    USERS;
Profile.prototype = new EventObject;
ProfileList.prototype = new EventObject;
Passenger.prototype = new EventObject;
LoginUser.prototype = new EventObject;
USERS = function() {
    function n() {
        var n = this;
        return n.list = {}, this.add = function(t, i, r) {
            n.list[t] = {
                dispname: i,
                password: r
            };
            n.save()
        }, this.find = function(t) {
            return n.list[t]
        }, this.remove = function(t) {
            n.list[t] && (delete n.list[t], n.save());
            localStorage.removeItem("12306_user_" + t)
        }, this.save = function() {
            localStorage["12306_userlist"] = JSON.stringify(n.list)
        }, this.load = function() {
            var t = localStorage["12306_userlist"] || "{}";
            n.list = JSON.parse(t)
        }, this.load(), this
    }
    return n.prototype = new EventObject, new n
}()

var Gallery = function() {
    var n = this;
    this.stages = {};
    this.initStatus = {};
    this.storage = Storage;
    $(".backBtn").click(function() {
        Statistics.trigger(19, (new Gallery).getCurrentStage());
        (new Gallery).backTo($(this).attr("_backTo"), $(this).attr("_backWhole") == "true")
    });
    $(".closeBtn").click(function() {
        Statistics.trigger(35, (new Gallery).getCurrentStage());
        window.close()
    });
    this.currentHeader = $("[_header]", $(".wrap"));
    this.newHeader = this.currentHeader.clone(!0, !0);
    this.mask = $("#mask");
    Gallery = function() {
        return n
    }
};
Gallery.prototype.addStage = function(n, t) {
    return this.stages[n] = t, this.initStatus[n] = !1, this.stages[n].deamon && this.stages[n].deamon(), this
};
Gallery.prototype.prepare = function(n, t) {
    this.initStatus[n] === !1 && (this.stages[n].init !== undefined && this.stages[n].init(), this.initStatus[n] = !0);
    this.stages[n].prepare !== undefined && this.stages[n].prepare(t)
};
Gallery.prototype.moveTo = function(n, t, i, r) {
    var u = r === "-" ? "Go" : "Back",
        f, e = this.currentStage;
    return arguments[1] === undefined && (t = !1), t && (this.newHeader.css("left", "").addClass("prepareTo" + u).show(), f = this.currentHeader, f.css("left", "").addClass("readyTo" + u), this.newHeader.prependTo(".wrap"), this.currentHeader = this.newHeader, this.newHeader = f), this.fillHeader(this.currentHeader, n), $(".main[_stage=" + this.currentStage + "]").addClass("readyTo" + u), $(".main[_stage=" + n + "]").addClass("prepareTo" + u).show(), $("#cover").show(), $(".readyTo" + u + ",.prepareTo" + u).animate({
        left: r + "=340px"
    }, "slow", "", function() {
        var t = (new Gallery).getStages()[n];
        oldStage = (new Gallery).getStages()[e];
        $(this).hasClass("readyTo" + u) && $(this).removeClass("readyTo" + u).hide();
        $(this).hasClass("prepareTo" + u) && $(this).removeClass("prepareTo" + u);
        $(this).css("left", "");
        $(this).hasClass(n) && $("#cover").hide();
        $(this).hasClass(n) && t.showed !== undefined && t.showed(i);
        $(this).hasClass(e) && oldStage.gone !== undefined && oldStage.gone(i)
    }), this.prepare(n, i), this.currentStage = n, this.stages[this.currentStage].temp || this.storage.set("lastStage", this.currentStage), this
};
Gallery.prototype.goTo = function(n, t, i) {
    return this.moveTo(n, t, i, "-")
};
Gallery.prototype.backTo = function(n, t, i) {
    return this.moveTo(n, t, i, "+")
};
Gallery.prototype.initShow = function(n, t) {
    this.prepare(n, t);
    this.fillHeader($("[_header]"), n);
    $(".main[_stage!=" + n + "]").hide();
    $(".main[_stage=" + n + "]").show();
    this.currentStage = n;
    this.stages[n].showed !== undefined && this.stages[n].showed(t)
};
Gallery.prototype.fillHeader = function(n, t) {
    Filler.fill(n, this.stages[t].header, {
        prevStage: function(n, t) {
            return n.prevStage === undefined ? t.hide() : t.show(), n.prevStage
        },
        backWhole: function(n) {
            return n.backWhole === undefined || n.backWhole === !1 ? "false" : "true"
        }
    })
};
Gallery.prototype.getStages = function() {
    return this.stages
};
Gallery.prototype.getCurrentStage = function() {
    return this.currentStage
};
Gallery.prototype.showMask = function() {
    return this.mask.show(), this
};
Gallery.prototype.hideMask = function() {
    return this.mask.hideMask(), this
}

var Filler = {
    fill: function(n, t, i) {
        var u = function(n, r) {
                for (var o = n.split("."), u = t, f = i, e = 0; e < o.length; e++) u !== undefined && (u = u[o[e]]), f !== undefined && (f = f[o[e]]);
                return (f !== undefined && (u = f(t, r)), u === undefined) ? undefined : u
            },
            f = function(n) {
                for (var r = n.attr("_innerData").split("|"), t, i = 0; i < r.length; i++) t = r[i].split(":"), n.attr(t[0], u(t[1], n))
            },
            r;
        n.attr("_innerData") !== undefined && f(n);
        $("[_innerData]", n).each(function() {
            f($(this))
        });
        r = function(n) {
            var t = u(n.attr("_data"), n);
            n.is("input") ? n.val(t) : n.html(t)
        };
        n.attr("_data") !== undefined && r(n);
        $("[_data]", n).each(function() {
            r($(this))
        })
    },
    loop: function(n, t, i) {
        var f = $($("[_template]", n)[0]),
            r, u;
        n.empty();
        for (u in t) r = f.clone(), Filler.fill(r, t[u], i), Filler.fill(r, {
            __id: u
        }), r.appendTo(n)
    }
}

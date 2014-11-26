(function() {
    var y = this,
        lt = y._,
        e = {},
        r = Array.prototype,
        nt = Object.prototype,
        at = Function.prototype,
        p = r.push,
        t = r.slice,
        o = r.concat,
        f = nt.toString,
        vt = nt.hasOwnProperty,
        tt = r.forEach,
        it = r.map,
        rt = r.reduce,
        ut = r.reduceRight,
        ft = r.filter,
        et = r.every,
        ot = r.some,
        s = r.indexOf,
        st = r.lastIndexOf,
        yt = Array.isArray,
        pt = Object.keys,
        w = at.bind,
        n = function(t) {
            if (t instanceof n) return t;
            if (!(this instanceof n)) return new n(t);
            this._wrapped = t
        },
        i, b, k, h, c, d, l, a, u, ht, ct, v;
    typeof exports != "undefined" ? (typeof module != "undefined" && module.exports && (exports = module.exports = n), exports._ = n) : y._ = n;
    n.VERSION = "1.5.2";
    i = n.each = n.forEach = function(t, i, r) {
        var o, u, f;
        if (t != null)
            if (tt && t.forEach === tt) t.forEach(i, r);
            else if (t.length === +t.length) {
            for (u = 0, f = t.length; u < f; u++)
                if (i.call(r, t[u], u, t) === e) return
        } else
            for (o = n.keys(t), u = 0, f = o.length; u < f; u++)
                if (i.call(r, t[o[u]], o[u], t) === e) return
    };
    n.map = n.collect = function(n, t, r) {
        var u = [];
        return n == null ? u : it && n.map === it ? n.map(t, r) : (i(n, function(n, i, f) {
            u.push(t.call(r, n, i, f))
        }), u)
    };
    b = "Reduce of empty array with no initial value";
    n.reduce = n.foldl = n.inject = function(t, r, u, f) {
        var e = arguments.length > 2;
        if (t == null && (t = []), rt && t.reduce === rt) return f && (r = n.bind(r, f)), e ? t.reduce(r, u) : t.reduce(r);
        if (i(t, function(n, t, i) {
                e ? u = r.call(f, u, n, t, i) : (u = n, e = !0)
            }), !e) throw new TypeError(b);
        return u
    };
    n.reduceRight = n.foldr = function(t, r, u, f) {
        var o = arguments.length > 2,
            e, s;
        if (t == null && (t = []), ut && t.reduceRight === ut) return f && (r = n.bind(r, f)), o ? t.reduceRight(r, u) : t.reduceRight(r);
        if (e = t.length, e !== +e && (s = n.keys(t), e = s.length), i(t, function(n, i, h) {
                i = s ? s[--e] : --e;
                o ? u = r.call(f, u, t[i], i, h) : (u = t[i], o = !0)
            }), !o) throw new TypeError(b);
        return u
    };
    n.find = n.detect = function(n, t, i) {
        var r;
        return k(n, function(n, u, f) {
            if (t.call(i, n, u, f)) return r = n, !0
        }), r
    };
    n.filter = n.select = function(n, t, r) {
        var u = [];
        return n == null ? u : ft && n.filter === ft ? n.filter(t, r) : (i(n, function(n, i, f) {
            t.call(r, n, i, f) && u.push(n)
        }), u)
    };
    n.reject = function(t, i, r) {
        return n.filter(t, function(n, t, u) {
            return !i.call(r, n, t, u)
        }, r)
    };
    n.every = n.all = function(t, r, u) {
        r || (r = n.identity);
        var f = !0;
        return t == null ? f : et && t.every === et ? t.every(r, u) : (i(t, function(n, t, i) {
            if (!(f = f && r.call(u, n, t, i))) return e
        }), !!f)
    };
    k = n.some = n.any = function(t, r, u) {
        r || (r = n.identity);
        var f = !1;
        return t == null ? f : ot && t.some === ot ? t.some(r, u) : (i(t, function(n, t, i) {
            if (f || (f = r.call(u, n, t, i))) return e
        }), !!f)
    };
    n.contains = n.include = function(n, t) {
        return n == null ? !1 : s && n.indexOf === s ? n.indexOf(t) != -1 : k(n, function(n) {
            return n === t
        })
    };
    n.invoke = function(i, r) {
        var u = t.call(arguments, 2),
            f = n.isFunction(r);
        return n.map(i, function(n) {
            return (f ? r : n[r]).apply(n, u)
        })
    };
    n.pluck = function(t, i) {
        return n.map(t, function(n) {
            return n[i]
        })
    };
    n.where = function(t, i, r) {
        return n.isEmpty(i) ? r ? void 0 : [] : n[r ? "find" : "filter"](t, function(n) {
            for (var t in i)
                if (i[t] !== n[t]) return !1;
            return !0
        })
    };
    n.findWhere = function(t, i) {
        return n.where(t, i, !0)
    };
    n.max = function(t, r, u) {
        if (!r && n.isArray(t) && t[0] === +t[0] && t.length < 65535) return Math.max.apply(Math, t);
        if (!r && n.isEmpty(t)) return -Infinity;
        var f = {
            computed: -Infinity,
            value: -Infinity
        };
        return i(t, function(n, t, i) {
            var e = r ? r.call(u, n, t, i) : n;
            e > f.computed && (f = {
                value: n,
                computed: e
            })
        }), f.value
    };
    n.min = function(t, r, u) {
        if (!r && n.isArray(t) && t[0] === +t[0] && t.length < 65535) return Math.min.apply(Math, t);
        if (!r && n.isEmpty(t)) return Infinity;
        var f = {
            computed: Infinity,
            value: Infinity
        };
        return i(t, function(n, t, i) {
            var e = r ? r.call(u, n, t, i) : n;
            e < f.computed && (f = {
                value: n,
                computed: e
            })
        }), f.value
    };
    n.shuffle = function(t) {
        var u, f = 0,
            r = [];
        return i(t, function(t) {
            u = n.random(f++);
            r[f - 1] = r[u];
            r[u] = t
        }), r
    };
    n.sample = function(t, i, r) {
        return arguments.length < 2 || r ? t[n.random(t.length - 1)] : n.shuffle(t).slice(0, Math.max(0, i))
    };
    h = function(t) {
        return n.isFunction(t) ? t : function(n) {
            return n[t]
        }
    };
    n.sortBy = function(t, i, r) {
        var u = h(i);
        return n.pluck(n.map(t, function(n, t, i) {
            return {
                value: n,
                index: t,
                criteria: u.call(r, n, t, i)
            }
        }).sort(function(n, t) {
            var i = n.criteria,
                r = t.criteria;
            if (i !== r) {
                if (i > r || i === void 0) return 1;
                if (i < r || r === void 0) return -1
            }
            return n.index - t.index
        }), "value")
    };
    c = function(t) {
        return function(r, u, f) {
            var e = {},
                o = u == null ? n.identity : h(u);
            return i(r, function(n, i) {
                var u = o.call(f, n, i, r);
                t(e, u, n)
            }), e
        }
    };
    n.groupBy = c(function(t, i, r) {
        (n.has(t, i) ? t[i] : t[i] = []).push(r)
    });
    n.indexBy = c(function(n, t, i) {
        n[t] = i
    });
    n.countBy = c(function(t, i) {
        n.has(t, i) ? t[i] ++ : t[i] = 1
    });
    n.sortedIndex = function(t, i, r, u) {
        var e;
        r = r == null ? n.identity : h(r);
        for (var s = r.call(u, i), f = 0, o = t.length; f < o;) e = f + o >>> 1, r.call(u, t[e]) < s ? f = e + 1 : o = e;
        return f
    };
    n.toArray = function(i) {
        return i ? n.isArray(i) ? t.call(i) : i.length === +i.length ? n.map(i, n.identity) : n.values(i) : []
    };
    n.size = function(t) {
        return t == null ? 0 : t.length === +t.length ? t.length : n.keys(t).length
    };
    n.first = n.head = n.take = function(n, i, r) {
        if (n != null) return i == null || r ? n[0] : t.call(n, 0, i)
    };
    n.initial = function(n, i, r) {
        return t.call(n, 0, n.length - (i == null || r ? 1 : i))
    };
    n.last = function(n, i, r) {
        if (n != null) return i == null || r ? n[n.length - 1] : t.call(n, Math.max(n.length - i, 0))
    };
    n.rest = n.tail = n.drop = function(n, i, r) {
        return t.call(n, i == null || r ? 1 : i)
    };
    n.compact = function(t) {
        return n.filter(t, n.identity)
    };
    d = function(t, r, u) {
        return r && n.every(t, n.isArray) ? o.apply(u, t) : (i(t, function(t) {
            n.isArray(t) || n.isArguments(t) ? r ? p.apply(u, t) : d(t, r, u) : u.push(t)
        }), u)
    };
    n.flatten = function(n, t) {
        return d(n, t, [])
    };
    n.without = function(i) {
        return n.difference(i, t.call(arguments, 1))
    };
    n.uniq = n.unique = function(t, r, u, f) {
        n.isFunction(r) && (f = u, u = r, r = !1);
        var s = u ? n.map(t, u, f) : t,
            o = [],
            e = [];
        return i(s, function(i, u) {
            (r ? u && e[e.length - 1] === i : n.contains(e, i)) || (e.push(i), o.push(t[u]))
        }), o
    };
    n.union = function() {
        return n.uniq(n.flatten(arguments, !0))
    };
    n.intersection = function(i) {
        var r = t.call(arguments, 1);
        return n.filter(n.uniq(i), function(t) {
            return n.every(r, function(i) {
                return n.indexOf(i, t) >= 0
            })
        })
    };
    n.difference = function(i) {
        var u = o.apply(r, t.call(arguments, 1));
        return n.filter(i, function(t) {
            return !n.contains(u, t)
        })
    };
    n.zip = function() {
        for (var i = n.max(n.pluck(arguments, "length").concat(0)), r = new Array(i), t = 0; t < i; t++) r[t] = n.pluck(arguments, "" + t);
        return r
    };
    n.object = function(n, t) {
        var r, i, u;
        if (n == null) return {};
        for (r = {}, i = 0, u = n.length; i < u; i++) t ? r[n[i]] = t[i] : r[n[i][0]] = n[i][1];
        return r
    };
    n.indexOf = function(t, i, r) {
        if (t == null) return -1;
        var u = 0,
            f = t.length;
        if (r)
            if (typeof r == "number") u = r < 0 ? Math.max(0, f + r) : r;
            else return u = n.sortedIndex(t, i), t[u] === i ? u : -1;
        if (s && t.indexOf === s) return t.indexOf(i, r);
        for (; u < f; u++)
            if (t[u] === i) return u;
        return -1
    };
    n.lastIndexOf = function(n, t, i) {
        var u, r;
        if (n == null) return -1;
        if (u = i != null, st && n.lastIndexOf === st) return u ? n.lastIndexOf(t, i) : n.lastIndexOf(t);
        for (r = u ? i : n.length; r--;)
            if (n[r] === t) return r;
        return -1
    };
    n.range = function(n, t, i) {
        arguments.length <= 1 && (t = n || 0, n = 0);
        i = arguments[2] || 1;
        for (var r = Math.max(Math.ceil((t - n) / i), 0), u = 0, f = new Array(r); u < r;) f[u++] = n, n += i;
        return f
    };
    l = function() {};
    n.bind = function(i, r) {
        var u, f;
        if (w && i.bind === w) return w.apply(i, t.call(arguments, 1));
        if (!n.isFunction(i)) throw new TypeError;
        return u = t.call(arguments, 2), f = function() {
            var e, n;
            return (this instanceof f) ? (l.prototype = i.prototype, e = new l, l.prototype = null, n = i.apply(e, u.concat(t.call(arguments))), Object(n) === n) ? n : e : i.apply(r, u.concat(t.call(arguments)))
        }
    };
    n.partial = function(n) {
        var i = t.call(arguments, 1);
        return function() {
            return n.apply(this, i.concat(t.call(arguments)))
        }
    };
    n.bindAll = function(r) {
        var u = t.call(arguments, 1);
        if (u.length === 0) throw new Error("bindAll must be passed function names");
        return i(u, function(t) {
            r[t] = n.bind(r[t], r)
        }), r
    };
    n.memoize = function(t, i) {
        var r = {};
        return i || (i = n.identity),
            function() {
                var u = i.apply(this, arguments);
                return n.has(r, u) ? r[u] : r[u] = t.apply(this, arguments)
            }
    };
    n.delay = function(n, i) {
        var r = t.call(arguments, 2);
        return setTimeout(function() {
            return n.apply(null, r)
        }, i)
    };
    n.defer = function(i) {
        return n.delay.apply(n, [i, 1].concat(t.call(arguments, 1)))
    };
    n.throttle = function(n, t, i) {
        var f, e, o, r = null,
            u = 0,
            s;
        return i || (i = {}), s = function() {
                u = i.leading === !1 ? 0 : new Date;
                r = null;
                o = n.apply(f, e)
            },
            function() {
                var h = new Date,
                    c;
                return u || i.leading !== !1 || (u = h), c = t - (h - u), f = this, e = arguments, c <= 0 ? (clearTimeout(r), r = null, u = h, o = n.apply(f, e)) : r || i.trailing === !1 || (r = setTimeout(s, c)), o
            }
    };
    n.debounce = function(n, t, i) {
        var r, u, f, o, e;
        return function() {
            f = this;
            u = arguments;
            o = new Date;
            var s = function() {
                    var h = new Date - o;
                    h < t ? r = setTimeout(s, t - h) : (r = null, i || (e = n.apply(f, u)))
                },
                h = i && !r;
            return r || (r = setTimeout(s, t)), h && (e = n.apply(f, u)), e
        }
    };
    n.once = function(n) {
        var i = !1,
            t;
        return function() {
            return i ? t : (i = !0, t = n.apply(this, arguments), n = null, t)
        }
    };
    n.wrap = function(n, t) {
        return function() {
            var i = [n];
            return p.apply(i, arguments), t.apply(this, i)
        }
    };
    n.compose = function() {
        var n = arguments;
        return function() {
            for (var t = arguments, i = n.length - 1; i >= 0; i--) t = [n[i].apply(this, t)];
            return t[0]
        }
    };
    n.after = function(n, t) {
        return function() {
            if (--n < 1) return t.apply(this, arguments)
        }
    };
    n.keys = pt || function(t) {
        var i, r;
        if (t !== Object(t)) throw new TypeError("Invalid object");
        i = [];
        for (r in t) n.has(t, r) && i.push(r);
        return i
    };
    n.values = function(t) {
        for (var r = n.keys(t), u = r.length, f = new Array(u), i = 0; i < u; i++) f[i] = t[r[i]];
        return f
    };
    n.pairs = function(t) {
        for (var r = n.keys(t), u = r.length, f = new Array(u), i = 0; i < u; i++) f[i] = [r[i], t[r[i]]];
        return f
    };
    n.invert = function(t) {
        for (var u = {}, r = n.keys(t), i = 0, f = r.length; i < f; i++) u[t[r[i]]] = r[i];
        return u
    };
    n.functions = n.methods = function(t) {
        var i = [];
        for (var r in t) n.isFunction(t[r]) && i.push(r);
        return i.sort()
    };
    n.extend = function(n) {
        return i(t.call(arguments, 1), function(t) {
            if (t)
                for (var i in t) n[i] = t[i]
        }), n
    };
    n.pick = function(n) {
        var u = {},
            f = o.apply(r, t.call(arguments, 1));
        return i(f, function(t) {
            t in n && (u[t] = n[t])
        }), u
    };
    n.omit = function(i) {
        var f = {},
            e = o.apply(r, t.call(arguments, 1));
        for (var u in i) n.contains(e, u) || (f[u] = i[u]);
        return f
    };
    n.defaults = function(n) {
        return i(t.call(arguments, 1), function(t) {
            if (t)
                for (var i in t) n[i] === void 0 && (n[i] = t[i])
        }), n
    };
    n.clone = function(t) {
        return n.isObject(t) ? n.isArray(t) ? t.slice() : n.extend({}, t) : t
    };
    n.tap = function(n, t) {
        return t(n), n
    };
    a = function(t, i, r, u) {
        var l, v, h, c, e, o, s;
        if (t === i) return t !== 0 || 1 / t == 1 / i;
        if (t == null || i == null) return t === i;
        if (t instanceof n && (t = t._wrapped), i instanceof n && (i = i._wrapped), l = f.call(t), l != f.call(i)) return !1;
        switch (l) {
            case "[object String]":
                return t == String(i);
            case "[object Number]":
                return t != +t ? i != +i : t == 0 ? 1 / t == 1 / i : t == +i;
            case "[object Date]":
            case "[object Boolean]":
                return +t == +i;
            case "[object RegExp]":
                return t.source == i.source && t.global == i.global && t.multiline == i.multiline && t.ignoreCase == i.ignoreCase
        }
        if (typeof t != "object" || typeof i != "object") return !1;
        for (v = r.length; v--;)
            if (r[v] == t) return u[v] == i;
        if (h = t.constructor, c = i.constructor, h !== c && !(n.isFunction(h) && h instanceof h && n.isFunction(c) && c instanceof c)) return !1;
        if (r.push(t), u.push(i), e = 0, o = !0, l == "[object Array]") {
            if (e = t.length, o = e == i.length, o)
                while (e--)
                    if (!(o = a(t[e], i[e], r, u))) break
        } else {
            for (s in t)
                if (n.has(t, s) && (e++, !(o = n.has(i, s) && a(t[s], i[s], r, u)))) break;
            if (o) {
                for (s in i)
                    if (n.has(i, s) && !e--) break;
                o = !e
            }
        }
        return r.pop(), u.pop(), o
    };
    n.isEqual = function(n, t) {
        return a(n, t, [], [])
    };
    n.isEmpty = function(t) {
        if (t == null) return !0;
        if (n.isArray(t) || n.isString(t)) return t.length === 0;
        for (var i in t)
            if (n.has(t, i)) return !1;
        return !0
    };
    n.isElement = function(n) {
        return !!(n && n.nodeType === 1)
    };
    n.isArray = yt || function(n) {
        return f.call(n) == "[object Array]"
    };
    n.isObject = function(n) {
        return n === Object(n)
    };
    i(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(t) {
        n["is" + t] = function(n) {
            return f.call(n) == "[object " + t + "]"
        }
    });
    n.isArguments(arguments) || (n.isArguments = function(t) {
        return !!(t && n.has(t, "callee"))
    });
    typeof /./ != "function" && (n.isFunction = function(n) {
        return typeof n == "function"
    });
    n.isFinite = function(n) {
        return isFinite(n) && !isNaN(parseFloat(n))
    };
    n.isNaN = function(t) {
        return n.isNumber(t) && t != +t
    };
    n.isBoolean = function(n) {
        return n === !0 || n === !1 || f.call(n) == "[object Boolean]"
    };
    n.isNull = function(n) {
        return n === null
    };
    n.isUndefined = function(n) {
        return n === void 0
    };
    n.has = function(n, t) {
        return vt.call(n, t)
    };
    n.noConflict = function() {
        return y._ = lt, this
    };
    n.identity = function(n) {
        return n
    };
    n.times = function(n, t, i) {
        for (var u = Array(Math.max(0, n)), r = 0; r < n; r++) u[r] = t.call(i, r);
        return u
    };
    n.random = function(n, t) {
        return t == null && (t = n, n = 0), n + Math.floor(Math.random() * (t - n + 1))
    };
    u = {
        escape: {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;"
        }
    };
    u.unescape = n.invert(u.escape);
    ht = {
        escape: new RegExp("[" + n.keys(u.escape).join("") + "]", "g"),
        unescape: new RegExp("(" + n.keys(u.unescape).join("|") + ")", "g")
    };
    n.each(["escape", "unescape"], function(t) {
        n[t] = function(n) {
            return n == null ? "" : ("" + n).replace(ht[t], function(n) {
                return u[t][n]
            })
        }
    });
    n.result = function(t, i) {
        if (t == null) return void 0;
        var r = t[i];
        return n.isFunction(r) ? r.call(t) : r
    };
    n.mixin = function(t) {
        i(n.functions(t), function(i) {
            var r = n[i] = t[i];
            n.prototype[i] = function() {
                var t = [this._wrapped];
                return p.apply(t, arguments), v.call(this, r.apply(n, t))
            }
        })
    };
    ct = 0;
    n.uniqueId = function(n) {
        var t = ++ct + "";
        return n ? n + t : t
    };
    n.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var g = /(.)^/,
        wt = {
            "'": "'",
            "\\": "\\",
            "\r": "r",
            "\n": "n",
            "\t": "t",
            "\u2028": "u2028",
            "\u2029": "u2029"
        },
        bt = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    n.template = function(t, i, r) {
        var f, e;
        r = n.defaults({}, r, n.templateSettings);
        var h = new RegExp([(r.escape || g).source, (r.interpolate || g).source, (r.evaluate || g).source].join("|") + "|$", "g"),
            o = 0,
            u = "__p+='";
        t.replace(h, function(n, i, r, f, e) {
            return u += t.slice(o, e).replace(bt, function(n) {
                return "\\" + wt[n]
            }), i && (u += "'+\n((__t=(" + i + "))==null?'':_.escape(__t))+\n'"), r && (u += "'+\n((__t=(" + r + "))==null?'':__t)+\n'"), f && (u += "';\n" + f + "\n__p+='"), o = e + n.length, n
        });
        u += "';\n";
        r.variable || (u = "with(obj||{}){\n" + u + "}\n");
        u = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + u + "return __p;\n";
        try {
            f = new Function(r.variable || "obj", "_", u)
        } catch (s) {
            s.source = u;
            throw s;
        }
        return i ? f(i, n) : (e = function(t) {
            return f.call(this, t, n)
        }, e.source = "function(" + (r.variable || "obj") + "){\n" + u + "}", e)
    };
    n.chain = function(t) {
        return n(t).chain()
    };
    v = function(t) {
        return this._chain ? n(t).chain() : t
    };
    n.mixin(n);
    i(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(t) {
        var i = r[t];
        n.prototype[t] = function() {
            var n = this._wrapped;
            return i.apply(n, arguments), (t == "shift" || t == "splice") && n.length === 0 && delete n[0], v.call(this, n)
        }
    });
    i(["concat", "join", "slice"], function(t) {
        var i = r[t];
        n.prototype[t] = function() {
            return v.call(this, i.apply(this._wrapped, arguments))
        }
    });
    n.extend(n.prototype, {
        chain: function() {
            return this._chain = !0, this
        },
        value: function() {
            return this._wrapped
        }
    })
}).call(this),
    function(n) {
        n = n || {};
        n.toMap = function(t, i) {
            var r = {};
            return n.each(t, function(n) {
                var t = typeof i == "function" ? i(n) : n[i];
                r[t] = r[t] ? [r[t], n] : n
            }), r
        }
    }(_)
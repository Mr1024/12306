(function() {
    var n = document.createElement("script");
    n.textContent = "(" + function() {
        var n = window.setInterval,
            t = window.setTimeout;
        window.setInterval = function(t, i) {
            var r = this;
            return i /= 2, n.apply(r, [t, i])
        };
        window.setTimeout = function(n, i) {
            var r = this;
            return i /= 2, t.apply(r, [n, i])
        }
    } + ")();";
    document.documentElement.appendChild(n)
})

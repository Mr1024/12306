var baseInfo = function() {
    function t() {
        this.info = JSON.parse($.ajax({
            url: "/manifest.json",
            async: !1
        }).responseText)
    }
    var n;
    return {
        getInstance: function() {
            return n === undefined && (n = new t), n
        }
    }
}()

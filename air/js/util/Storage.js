var Storage = {
        get: function(n) {
            return window.localStorage.getItem(n)
        },
        set: function(n, t) {
            typeof t == "object" ? window.localStorage.setItem(n, JSON.stringify(t)) : window.localStorage.setItem(n, t)
        },
        getWithDefault: function(n, t) {
            var i = this.get(n);
            return i != null ? i : arguments[1] ? (this.set(n, t), t) : null
        },
        remove: function(n) {
            var t = this.get(n);
            return window.localStorage.removeItem(n), t
        }
    },
    FlightStorage = {
        getQuery: function() {
            return {
                from: Storage.get("flightFrom"),
                to: Storage.get("flightTo"),
                date: parseInt(Storage.get("flightDate")),
                moreDays: Storage.get("flightFiveDays") == "true"
            }
        }
    }
